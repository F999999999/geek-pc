import styles from "./index.module.scss";
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Radio,
  Space,
  Upload,
} from "antd";
import { Link } from "react-router-dom";
import { Channel } from "@/components/Channel";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

const Publish = () => {
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
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form labelCol={{ span: 4 }}>
          <Form.Item label="文章标题：" name="title">
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="所属频道：" name="channel_id">
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
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary">发表文章</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
