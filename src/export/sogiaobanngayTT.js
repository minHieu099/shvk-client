import {
    Document,
    Paragraph,
    AlignmentType,
    TextRun,
    Table,
    TableCell,
    TableRow,
    WidthType,
    BorderStyle,
    ImageRun,
    TabStopPosition,
    TabStopType,
    PositionalTabLeader,
    PageBreak,
  } from "docx";
  import formatParagraph from "./formatParagraph";
  
  const dotTab = [
    {
      type: TabStopType.LEFT,
      position: TabStopPosition.MAX + 5000,
      leader: PositionalTabLeader.DOT,
    },
  ];
  let renderSgbnTT = (data) => {
    console.log(data);
    const doc = new Document({
      sections: [
        {
          properties: {
            pageNumberStart: 1,
            page: {
              size: {
                height: 11905,
                width: 16837,
              },
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text:
                    "GIAO BAN NGAY " + data.thoigian,
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    text:
                      "TRỰC CHỈ HUY TRUNG TÂM:     " + data.truc_CHTT,
                    size: 28,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    text:
                      "TRỰC CƠ QUAN THAM MƯU:     " + data.truc_cqtm,
                    size: 28,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    text:
                      "TRỰC BAN TÁC CHIẾN:      " + data.tbtc,
                    size: 28,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    text:
                      "TRỰC CƠ QUAN CHÍNH TRỊ:       " + data.truc_cqct,
                    size: 28,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph(""),
              new Table({
                width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "I.Quân số - vũ khí, trang bị",
                                                size: 28,
                                                bold: true,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "1.Quân số",
                                                size: 28,
                                                bold: true,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "- Tổng quân số có mặt/biên chế:  " + data.quanso_co_mat + "/" + data.quanso_tong,
                                                size: 28,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        tabStops: [
                                            {
                                                type: TabStopType.LEFT,
                                                position: TabStopPosition.MAX * 0.2,
                                            }
                                        ],
                                        children: [
                                            new TextRun({
                                                text: "SQ:  " + data.quanso_SQ + ";",
                                                size: 28,
                                            }),
                                            new TextRun({
                                                text: "\t",
                                            }),
                                            new TextRun({
                                                text: "QNCN:  " + data.quanso_QNCN + ";",
                                                size: 28,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "HSQ - BS:  " + data.quanso_HSQ_BS + ";",
                                                size: 28,
                                            }),
                                            new TextRun("      "),
                                            new TextRun({
                                                text: "CCQP:  " + data.quanso_CCQP + ";",
                                                size: 28,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "Phép:  " + data.quanso_phep + ";",
                                                size: 28,
                                            }),
                                            new TextRun("   "),
                                            new TextRun({
                                                text: "Học:  " + data.quanso_hoc + ";",
                                                size: 28,
                                            }),
                                            new TextRun("   "),
                                            new TextRun({
                                                text: "Ốm:  " + data.quanso_om + ";",
                                                size: 28,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "CT:  " + data.quanso_ct + ";",
                                                size: 28,
                                            }),
                                            new TextRun("   "),
                                            new TextRun({
                                                text: "TT:  " + data.quanso_tt + ";",
                                                size: 28,
                                            }),
                                            new TextRun("   "),
                                            new TextRun({
                                                text: "Khác:  " + data.quanso_khac + ";",
                                                size: 28,
                                            }),
                                        ],
                                    }),
                            
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "2. Vũ khí, khí tài trang bị",
                                                size: 28,
                                                bold: true,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "- Súng K54:  " + data.sung_k54 + ";",
                                                size: 28,
                                            }),
                                            new TextRun("       "),
                                            new TextRun({
                                                text: "Đạn K54:  " + data.dan_k54 + ";",
                                                size: 28,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "Súng AK:  " + data.sung_ak + ";",
                                                size: 28,
                                            }),
                                            new TextRun("      "),
                                            new TextRun({
                                                text: "Đạn AK:  " + data.dan_ak + ";",
                                                size: 28,
                                            }),
                                        ],
                                    }),
                        
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "II. Kết quả thực hiện nhiệm vụ trong ngày",
                                                size: 28,
                                                bold: true,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "1.Điểm mạnh",
                                                size: 28,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: formatParagraph(3,[data.ketqua_diemmanh]),
                                        tabStops: dotTab,
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "2.Tồn tại",
                                                size: 28,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: formatParagraph(3,[data.ketqua_tontai]),
                                        tabStops: dotTab,
                                    }),
                                                                      
                                ],
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "III. Dự kiến Kế hoạch ngày Bộ Tư lệnh",
                                                size: 28,
                                                bold: true,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children:formatParagraph(3,[data.noidung_dukien]),
                                        tabStops: dotTab
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "IV. Kiến nghị, đề nghị (nếu có)",
                                                size: 28,
                                                bold: true,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children:formatParagraph(4,[data.noidung_dukien]),
                                        tabStops: dotTab
                                    }),
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "V. Kết luận của Trực chỉ huy Bộ Tư lệnh",
                                                size: 28,
                                                bold: true,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        children: formatParagraph(3,[data.noidung_ketluan]),
                                        tabStops: dotTab
                                    }),
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: "TRỰC CHỈ HUY",
                                                size: 28,
                                                bold: true,
                                            }),
                                        ],
                                    }),
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                          new ImageRun({
                                            data: data.signatureImage.split(",")[1],
                                            transformation: {
                                              width: 100,
                                              height: 50,
                                            },
                                            break: 1,
                                          }),
                                        ],
                                      }),
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: data.truc_CHTT,
                                                size: 28,
                                                bold: true
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),

                ],
                margins: {
                    left: 200,
                    top: 100,
                    bottom: 100,
             
                },
            }),

        ],
    },
],
});
return doc;
}
  
  export default renderSgbnTT;
  