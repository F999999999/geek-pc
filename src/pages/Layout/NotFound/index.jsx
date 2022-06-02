import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigation = useNavigate();
  return (
    <Result
      style={{ paddingTop: 100 }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigation("/")} type="primary">
          返回首页
        </Button>
      }
    />
  );
};

export default NotFound;
