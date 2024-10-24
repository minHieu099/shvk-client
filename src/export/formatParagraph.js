import { TextRun,TabStopPosition, TabStopType, PositionalTabLeader } from "docx";


export const dotTab = [
    {
        type: TabStopType.LEFT,
        position: TabStopPosition.MAX - 2500,
        leader: PositionalTabLeader.DOT,
    },
]
const formatParagraph = (lines,contentList) => {
    let formattedText = [];

    for (let i = 0; i < contentList.length; i++) {
        if (i === 0) {
            formattedText.push(new TextRun({
                text: contentList[0],
                size: 28,
            }))
        } else {
            formattedText.push(new TextRun({
                text: contentList[i] ,
                size: 28,
                break: 1,
            }))
        }
    }
    for (let i = contentList.length; i < lines; i++) {
        formattedText.push(new TextRun({
            text: "\t",
            size: 28,
            break: 1,
        }))


    }
    formattedText.push(new TextRun({
        text: "",
        size: 28,
        break: 1,
    }));
    return formattedText;
}
export default formatParagraph;