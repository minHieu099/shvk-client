import React from "react";
import { Button } from "@mui/material";
import renderGbnTT from "../../export/giaobanngayTT";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import ImageBased64 from "../data/ImageBased64";
const imagePath = "../../export/identity/H.png";
const OnlineMeeting = () => {

  const handleButtonClick = () => {
    const data = 
        {
          id: 2,
          thoigian: "28/01/2024",
          truc_CH: "4// Đặng Quốc Cường",
          truc_ban_cu_1: "Trung tá fsdfsdaf",
          truc_ban_cu_2: "Thiếu tá fsdfdsfd",
          truc_ban_moi_1: "Trung tá fsdfasdfdsa",
          truc_ban_moi_2: "Trung tá fsdgfd",
          tong_qs: "134",
          qs_co_mat: "80",
          qs_vang: "54",
          ly_do: "03 TT, 01 CT, 01 TS",
          tinh_hinh: "- Xử lý FMC mất kết nối; - Xử lí fklsdjlfdskl.",
          viec_dotxuat: "Không",
          noidung_bangiao: "Xử lí FMCf hjsdkljfkldjsf sdjlkfsdfkls",
          signatureImage: ImageBased64
      };
    
    const doc = renderGbnTT(data);

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Giao ban ngày.docx`);
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Call Function
      </Button>
    </div>
  );
};

export default OnlineMeeting;
