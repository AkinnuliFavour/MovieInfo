export const linkStyle =
  "h-[86px] w-full flex justify-center items-center px-[42px] focus:bg-[#BE123C] focus:bg-opacity-10 focus:text-[#BE123C] focus:border-r-4 focus:border-r-[#BE123C] active:bg-[#BE123C] active:bg-opacity-10 active:text-[#BE123C] active:border-r-4 active:border-r-[#BE123C] hover:bg-[#BE123C] hover:bg-opacity-10 hover:text-[#BE123C] hover:border-r-4 hover:border-r-[#BE123C]";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();

  const ordinal = (day: number): string => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${ordinal(day)}, ${month} ${year}`;
}

export function breakIntoParagraphs(text: string, sentencesPerParagraph = 5) {
  // Split the text into sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];

  // Group sentences into paragraphs
  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join(" "));
  }

  return paragraphs;
}

// Example usage:
const longText =
  "This is sentence one. This is sentence two. Sentence three here. Fourth sentence. Fifth sentence. Sixth sentence. Seventh sentence. Eighth sentence. Ninth sentence. Tenth sentence.";
const result = breakIntoParagraphs(longText);
console.log(result);
