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
let renderGbnTT = (data) => {
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
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text:
                  "TỔNG HỢP TÌNH HÌNH HOẠT ĐỘNG TRONG NGÀY " + data.thoigian,
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
                            text: data.truc_CH,
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
                            text: "1: " + data.truc_ban_cu_1,
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
                            text: "1: " + data.truc_ban_moi_1,
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
                            text: "2: " + data.truc_ban_cu_2,
                            size: 28,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: "2: " + data.truc_ban_moi_2,
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
              "- Tổng quân số: " + data.tong_qs + ";",
              "- Quân số có mặt: " + data.qs_co_mat + ";",
              "- Quân số vắng mặt: " + data.qs_vang + ";",
              "- Lý do: " + data.ly_do + ".",
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
            children: formatParagraph(3, [data.tinh_hinh]),
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
            children: formatParagraph(2, [data.viec_dotxuat]),
            tabStops: dotTab,
          }),
          new Paragraph({
            children: [new PageBreak()],
          }),
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
            children: formatParagraph(3, [data.noidung_bangiao]),
            tabStops: dotTab,
          }),
          new Paragraph(""),
          new Paragraph(""),

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
                            data: data.signatureImage.split(",")[1],
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
                            text: data.truc_ban_moi_1,
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
                            text: data.truc_ban_cu_1,
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
        ],
      },
    ],
  });
  return doc;
};

export default renderGbnTT;
