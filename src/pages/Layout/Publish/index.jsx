import "react-quill/dist/quill.snow.css";
import styles from "./index.module.scss";
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  message,
  Radio,
  Space,
  Upload,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Channel } from "@/components/Channel";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { addArticle, editArticle, getArticle } from "@/store/articleSlice";
import { useDispatch } from "react-redux";

const Publish = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();
  // 文章封面类型
  const [type, setType] = useState(1);
  // 修改文章封面类型
  const onTypeChange = (e) => {
    setType(e.target.value);
    // 清空封面列表
    setFileList([]);
  };
  // 文章封面列表
  const [fileList, setFileList] = useState([]);
  // 上传文章封面
  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // 发布文章
  const addCurrentArticle = async (values, draft = false) => {
    // 判断封面图片是否上传
    if (type !== fileList.length) {
      return message.warning("请按照选择的封面类型上传图片");
    }
    const data = {
      ...values,
      cover: {
        type,
        images: fileList.map((item) => item?.response?.data?.url || item.url),
      },
      draft,
    };
    // 如果是否有文章id
    if (params.id) {
      // 编辑文章
      data.id = params.id;
      await dispatch(editArticle(data));
    } else {
      // 发布文章
      await dispatch(addArticle(data));
    }
    message.success("保存成功");
  };

  // 表单校验并提交
  const onFinish = async (values) => {
    await addCurrentArticle(values);
    navigation("/home/article");
  };

  // 保存文章到草稿
  const saveDarft = async () => {
    // 获取表单数据
    const values = await form.validateFields();
    // 添加到草稿
    await addCurrentArticle(values, true);
  };

  // 编辑回显文章
  const [form] = Form.useForm();
  useEffect(() => {
    const setFormData = async () => {
      if (params.id) {
        const { payload: result } = await dispatch(getArticle(params.id));
        if (result) {
          const { title, cover, content, channel_id } = result;
          form.setFieldsValue({ title, content, channel_id });
          setType(cover.type);
          setFileList(cover.images.map((item) => ({ url: item })));
        }
      } else {
        setType(1);
        setFileList([]);
        form.resetFields();
      }
    };
    setFormData();
  }, [dispatch, form, params]);

  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {params.id ? "修改文章" : "发布文章"}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form labelCol={{ span: 4 }} onFinish={onFinish} form={form}>
          <Form.Item
            label="文章标题："
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="所属频道："
            name="channel_id"
            rules={[{ required: true, message: "请选择所属频道" }]}
          >
            <Channel width={400} />
          </Form.Item>
          <Form.Item label="文章封面：">
            <Form.Item style={{ marginBottom: 0 }}>
              <Radio.Group value={type} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {type > 0 ? (
              <div style={{ marginTop: 16 }}>
                <Upload
                  name="image"
                  listType="picture-card"
                  action="http://geek.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onPreview={() => {}}
                  onChange={onUploadChange}
                >
                  {fileList.length < type ? (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>上传图片</div>
                    </div>
                  ) : null}
                </Upload>
              </div>
            ) : null}
          </Form.Item>
          <Form.Item
            label="文章内容："
            name="content"
            initialValue=""
            wrapperCol={{ span: 16 }}
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill placeholder="请输入文章内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                {params.id ? "修改文章" : "发布文章"}
              </Button>
              <Button size="large" onClick={saveDarft}>
                存入草稿
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
