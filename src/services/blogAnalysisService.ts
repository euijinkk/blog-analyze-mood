
import { BlogAnalysis } from "@/types/report";

export const analyzeBlog = async (blogUrl: string): Promise<BlogAnalysis> => {
  // In a real implementation, this would make an API call to your backend
  // For now, we'll simulate a delay and return mock data
  
  // Example API call structure:
  // const response = await fetch('/api/analyze', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ blogUrl }),
  // });
  
  // if (!response.ok) {
  //   throw new Error('Analysis failed');
  // }
  
  // return await response.json();
  
  // For now, return mock data after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: "창의적인 작가",
        summary_explanation: "이 블로그는 일상에서 발견한 특별한 순간들을 섬세하게 포착하고, 감성적인 시선으로 재해석합니다. 글쓴이는 개인적인 성찰과 경험을 바탕으로 독자들에게 공감과 위로를 전달합니다.",
        mbti: "ENFP",
        mbti_explanation: {
          "E/I": "다양한 경험과 사람들과의 만남을 통해 에너지를 얻는 외향형(E) 성향이 강합니다.",
          "S/N": "세부 사항보다 큰 그림을 보고 가능성에 집중하는 직관형(N) 특성이 뚜렷합니다.",
          "T/F": "논리적 분석보다 감정과 가치에 따라 판단하는 경향이 있어 감정형(F)으로 분류됩니다.",
          "J/P": "계획보다는 즉흥적이고 유연한 태도를 선호하는 인식형(P) 성향이 나타납니다."
        },
        keywords: ["#감성에세이", "#여행일기", "#일상의발견"],
        quotes: [
          {
            quote: "가장 특별한 순간은 대개 계획하지 않았던 곳에서 찾아온다.",
            quote_explanation: "작가의 인생 철학을 잘 보여주는 문장으로, 예상치 못한 상황에서 발견하는 소중한 가치를 강조합니다.",
            source_link: "https://blog.example.com/unexpected-moments"
          },
          {
            quote: "우리는 떠나기 위해 살지 않고, 살기 위해 떠난다.",
            quote_explanation: "여행의 진정한 의미에 대한 작가의 통찰력 있는 관점을 담고 있습니다.",
            source_link: "https://blog.example.com/travel-philosophy"
          }
        ],
        content_ratio: {
          expertise: "15%",
          essay: "45%",
          travel: "30%",
          self_improvement: "10%"
        }
      });
    }, 2000);
  });
};
