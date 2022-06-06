import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  Radio,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getArticles, getChannels } from "@/store/articleSlice";
import defaultImg from "@/assets/images/error.png";

const Article = () => {
  const dispatch = useDispatch();

  // 频道列表数据
  const channelsList = useSelector((state) => state.article.channels);
  // 文章列表和分页数据
  const {
    list: articleList,
    page,
    pageSize,
    count,
  } = useSelector((state) => state.article);
  useEffect(() => {
    dispatch(getChannels());
    dispatch(getArticles());
  }, []);

  // 筛选文章
  const onFinish = (values) => {
    const params = {};
    params.status = values.status;
    params.channel_id = values.channel_id;
    if (values.dateArr) {
      params.begin_pubdate = values.dateArr[0].format("YYYY-MM-DD HH:mm:ss");
      params.end_pubdate = values.dateArr[1].format("YYYY-MM-DD HH:mm:ss");
    } else {
      params.begin_pubdate = undefined;
      params.end_pubdate = undefined;
    }
    dispatch(getArticles(params));
  };

  // 文章列表翻页
  const onPageChange = (page, pageSize) => {
    dispatch(getArticles({ page, per_page: pageSize }));
  };

  // 阅读状态
  const statusLabel = [
    { text: "草稿", color: "default" },
    { text: "待审核", color: "blue" },
    { text: "审核通过", color: "green" },
    { text: "审核拒绝", color: "red" },
  ];

  // 表格列定义
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover) => (
        <Image
          src={cover?.images?.[0] || defaultImg}
          style={{ objectFit: "cover" }}
          width={200}
          height={120}
        />
      ),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const info = statusLabel[status];
        return <Tag color={info.color}>{info.text}</Tag>;
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
      key: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      key: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      key: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      key: "like_count",
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
          <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.root}>
      <Card
        title={
          // 面包屑
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form onFinish={onFinish}>
          <Form.Item label="状态：" name="status">
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>已通过</Radio>
              <Radio value={3}>已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：">
            <Form.Item name="channel_id">
              <Select style={{ width: 288 }}>
                {channelsList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item label="日期：">
            <Form.Item name="dateArr">
              <DatePicker.RangePicker />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card
        title={`根据筛选条件共查询到 100 条结果：`}
        style={{ marginTop: 24 }}
      >
        <Table
          columns={columns}
          dataSource={articleList}
          rowKey="id"
          pagination={{
            current: page,
            pageSize,
            total: count,
            onChange: onPageChange,
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default Article;
