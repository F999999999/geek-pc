import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getChannels } from "@/store/articleSlice";

export const Channel = ({ value, onChange, width }) => {
  const dispatch = useDispatch();

  // 频道列表数据
  const channels = useSelector((state) => state.article.channels);
  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  return (
    <Select
      placeholder="请选择文章频道"
      value={value}
      onChange={onChange}
      style={{ width: width }}
    >
      {channels.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};
