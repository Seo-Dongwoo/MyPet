import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CardSelect = ({ payment, setPayment }) => {
  const handleChange = (e) => {
    setPayment(e.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 240 }} size="small">
      <InputLabel id="demo-select-small">카드를 선택해주세요</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={payment}
        label="Card"
        defaultValue=""
        onChange={handleChange}
      >
        <MenuItem value="현대">현대</MenuItem>
        <MenuItem value="신한">신한</MenuItem>
        <MenuItem value="비씨">비씨</MenuItem>
        <MenuItem value="KB국민">KB국민</MenuItem>
        <MenuItem value="삼성">삼성</MenuItem>
        <MenuItem value="롯데">롯데</MenuItem>
        <MenuItem value="하나">하나</MenuItem>
        <MenuItem value="우리">우리</MenuItem>
        <MenuItem value="씨티">씨티</MenuItem>
        <MenuItem value="수협">수협</MenuItem>
        <MenuItem value="제주">제주</MenuItem>
        <MenuItem value="카카오뱅크">카카오뱅크</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CardSelect;
