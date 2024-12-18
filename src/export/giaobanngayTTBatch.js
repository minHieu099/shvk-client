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
    // JustificationPositions as JustificationType
  } from "docx";
  import formatParagraph from "./formatParagraph";
  
  const dotTab = [
    {
      type: TabStopType.LEFT,
      position: TabStopPosition.MAX + 5000,
      leader: PositionalTabLeader.DOT,
    },
  ];
const renderGbnTTBatch = (data) => {
  const { startDate, endDate, reports, signatureImage } = data;

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
            spacing: {
                before: 3000, // Điều chỉnh giá trị này để căn giữa theo chiều dọc
                after: 200,   // Khoảng cách với dòng tiếp theo
            },
          alignment: AlignmentType.CENTER,
        //   justification: JustificationType.CENTER,
          children: [
            new TextRun({
              text: `BÁO CÁO GIAO BAN`,
              bold: true,
              size: 50,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
        //   justification: JustificationType.CENTER,
          children: [
            new TextRun({
              text: `Từ ngày ${startDate} đến ngày ${endDate}`,
              size: 30,
              italics: true,
            }),
          ],
        }),
        new Paragraph({ children: [new PageBreak()] }),
        
        // Tạo bảng cho từng báo cáo
        ...reports.map(report => [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text:
                      "TỔNG HỢP TÌNH HÌNH HOẠT ĐỘNG TRONG NGÀY " + report.thoigian,
                    size: 28,
                    bold: true,
                  }),
                ],
              }),
              new Table({
                alignment: AlignmentType.CENTER,
                margins: {
                  top: 100,
                },
                width: {
                  size: 80,
                  type: WidthType.PERCENTAGE,
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: "Trực chỉ huy:  ",
                                size: 28,
                                bold: true,
                              }),
                              new TextRun({
                                text: report.truc_CH,
                                size: 28,
                                bold: false,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: "Trực ban cũ:   ",
                                size: 28,
                                bold: true,
                              }),
                              new TextRun({
                                text: "1. " + report.truc_ban_cu_1,
                                size: 28,
                                bold: false,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: "Trực ban mới: ",
                                size: 28,
                                bold: true,
                              }),
                              new TextRun({
                                text: "1. " + report.truc_ban_moi_1,
                                size: 28,
                                bold: false,
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          bottom: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          left: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          right: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: ".",
                                size: 28,
                                color: "FFFFFF",
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: "2. " + report.truc_ban_cu_2,
                                size: 28,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: "2. " + report.truc_ban_moi_2,
                                size: 28,
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          bottom: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          left: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          right: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                        },
                      }),
                    ],
                  }),
                ],
              }),
    
              new Paragraph({
                children: [
                  new TextRun({
                    text: "I. QUÂN SỐ",
                    size: 28,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                children: formatParagraph(3, [
                  "- Tổng quân số: " + report.tong_qs + ";",
                  "- Quân số có mặt: " + report.qs_co_mat + ";",
                  "- Quân số vắng mặt: " + report.qs_vang + ";",
                  "- Lý do: " + report.ly_do + ".",
                ]),
                tabStops: dotTab,
              }),
    
              new Paragraph({
                children: [
                  new TextRun({
                    text: "II. TÌNH HÌNH TRONG NGÀY",
                    size: 28,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                children: formatParagraph(5, [report.tinh_hinh]),
                tabStops: dotTab,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "III. NHỮNG VIỆC ĐỘT XUẤT XẢY RA",
                    size: 28,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                children: formatParagraph(3, [report.viec_dotxuat]),
                tabStops: dotTab,
              }),
            //   new Paragraph({
            //     children: [new PageBreak()],
            //   }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "IV. NỘI DUNG BÀN GIAO TRỰC BAN MỚI THEO DÕI, GIẢI QUYẾT",
                    size: 28,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                children: formatParagraph(4, [report.noidung_bangiao]),
                tabStops: dotTab,
              }),   
              new Table({
                margins: {
                  top: 100,
                },
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
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: "TRỰC BAN NHẬN PHIÊN",
                                size: 28,
                                bold: true,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: "(ký, cấp bậc, họ tên)",
                                size: 28,
                                bold: false,
                                italics: true,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new ImageRun({
                                data: signatureImage.split(",")[1],
                                transformation: {
                                  width: 100,
                                  height: 50,
                                  break: 1,
                                },
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: report.truc_ban_moi_1,
                                size: 28,
                                bold: true,
                                break: 1,
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          bottom: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          left: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          right: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                        },
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: "TRỰC BAN GIAO PHIÊN",
                                size: 28,
                                bold: true,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: "(ký, cấp bậc, họ tên)",
                                size: 28,
                                bold: false,
                                italics: true,
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new ImageRun({
                                data: signatureImage.split(",")[1],
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
                                text: report.truc_ban_cu_1,
                                size: 28,
                                bold: true,
                                break: 1,
                              }),
                            ],
                          }),
                        ],
                        borders: {
                          top: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          bottom: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          left: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                          right: {
                            style: BorderStyle.NONE,
                            size: 0,
                            color: "FFFFFF",
                          },
                        },
                      }),
                    ],
                  }),
                ],
              }),
          new Paragraph({ children: [new PageBreak()] }),
        ]).flat(),
      ],
    }],
  });

  return doc;
};

export default renderGbnTTBatch; 