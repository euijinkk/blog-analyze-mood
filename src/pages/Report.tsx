
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Copy, ExternalLink, Share2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { BlogAnalysis } from "@/types/report";

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogUrl, setBlogUrl] = useState("");
  const [analysis, setAnalysis] = useState<BlogAnalysis | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const url = params.get("url");
    
    if (!url) {
      navigate("/");
      return;
    }
    
    setBlogUrl(url);
    
    // Simulate API call to fetch analysis
    const fetchAnalysis = async () => {
      try {
        // In a real implementation, you would call your API here
        // For now, use mock data
        setTimeout(() => {
          setAnalysis(getMockAnalysisData());
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
        toast.error("분석 데이터를 불러오는 중 오류가 발생했습니다");
        navigate("/");
      }
    };
    
    fetchAnalysis();
  }, [location.search, navigate]);

  const getMockAnalysisData = (): BlogAnalysis => {
    return {
      summary: "창의적인 작가",
      summary_explanation: "이 블로그는 일상에서 발견한 특별한 순간들을 섬세하게 포착하고, 감성적인 시선으로 재해석합니다. 글쓴이는 개인적인 성찰과 경험을 바탕으로 독자들에게 공감과 위로를 전달합니다. 다양한 주제를 다루지만 특히 여행과 문화 관련 글에서 독창적인 관점이 돋보입니다.",
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
          quote_explanation: "작가의 인생 철학을 잘 보여주는 문장으로, 예상치 못한 상황에서 발견하는 소중한 가치를 강조합니다. 많은 독자들이 공감할 수 있는 보편적인 진리를 담고 있습니다.",
          source_link: "https://blog.example.com/unexpected-moments"
        },
        {
          quote: "우리는 떠나기 위해 살지 않고, 살기 위해 떠난다.",
          quote_explanation: "여행의 진정한 의미에 대한 작가의 통찰력 있는 관점을 담고 있습니다. 이 문장은 여행을 단순한 도피가 아닌 삶의 풍요로움을 위한 선택으로 바라보는 시각을 제시합니다.",
          source_link: "https://blog.example.com/travel-philosophy"
        }
      ],
      content_ratio: {
        expertise: "15%",
        essay: "45%",
        travel: "30%",
        self_improvement: "10%"
      }
    };
  };

  const handleCopyResult = () => {
    if (!analysis) return;
    
    const resultText = `
✨ 블로그 성향 분석 결과 ✨

📝 성향: ${analysis.summary}
🧠 MBTI: ${analysis.mbti}
🔑 키워드: ${analysis.keywords.join(', ')}

💭 명언: "${analysis.quotes[0].quote}"

블로그 성향 분석기로 더 자세히 알아보세요!
    `;
    
    navigator.clipboard.writeText(resultText);
    toast.success("분석 결과가 클립보드에 복사되었습니다");
  };

  const handleShareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: '블로그 성향 분석 결과',
        text: `내 블로그 성향은 ${analysis?.summary}! 내 MBTI는 ${analysis?.mbti}!`,
        url: window.location.href,
      })
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      handleCopyResult();
    }
  };

  const getContentRatioPercentage = (value: string) => {
    return parseInt(value.replace('%', ''));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto border-t-4 border-purple-700 border-solid rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold mb-2">블로그 분석 중...</h2>
          <p className="text-gray-600 mb-8">
            AI가 블로그 글을 분석하고 있어요. 잠시만 기다려주세요.
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">분석에 실패했습니다</h2>
          <p className="text-gray-600 mb-8">다시 시도해주세요</p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            처음으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <div className="container max-w-4xl py-12 px-6">
        <div className="mb-8 flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/")} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>홈으로</span>
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopyResult}>
              <Copy className="h-4 w-4 mr-2" />
              <span>복사하기</span>
            </Button>
            <Button variant="outline" onClick={handleShareResult}>
              <Share2 className="h-4 w-4 mr-2" />
              <span>공유하기</span>
            </Button>
          </div>
        </div>

        {/* Main Report Card */}
        <Card className="mb-8 overflow-hidden border-0 shadow-lg">
          <div className="bg-gradient-to-r from-purple-700 to-indigo-600 p-6 md:p-10 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">블로그 성향 분석 결과</h1>
            <p className="text-purple-100 text-lg mb-6">{blogUrl}</p>
            
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex-1 min-w-0">
                <div className="text-white/70 mb-1">당신의 블로그 성향은</div>
                <h2 className="text-3xl md:text-5xl font-bold mb-3">{analysis.summary}</h2>
                <p className="text-white/90">{analysis.summary_explanation}</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex-0 text-center">
                <div className="text-white/70 mb-1">예측 MBTI</div>
                <div className="text-4xl md:text-5xl font-bold">{analysis.mbti}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Report Grid */}
        <div className="report-grid mb-8">
          {/* MBTI Section */}
          <Card className="content-card">
            <CardHeader>
              <CardTitle className="text-2xl">MBTI 성격 유형</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-3xl font-bold mb-3 text-center text-purple-700">{analysis.mbti}</div>
                <Separator className="my-4" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">내향적(I)</span>
                    <span className="font-medium">외향적(E)</span>
                  </div>
                  <Progress value={analysis.mbti.includes("E") ? 75 : 25} className="h-2" />
                  <p className="text-sm mt-2 text-gray-600">{analysis.mbti_explanation["E/I"]}</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">감각적(S)</span>
                    <span className="font-medium">직관적(N)</span>
                  </div>
                  <Progress value={analysis.mbti.includes("N") ? 75 : 25} className="h-2" />
                  <p className="text-sm mt-2 text-gray-600">{analysis.mbti_explanation["S/N"]}</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">사고형(T)</span>
                    <span className="font-medium">감정형(F)</span>
                  </div>
                  <Progress value={analysis.mbti.includes("F") ? 75 : 25} className="h-2" />
                  <p className="text-sm mt-2 text-gray-600">{analysis.mbti_explanation["T/F"]}</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">판단형(J)</span>
                    <span className="font-medium">인식형(P)</span>
                  </div>
                  <Progress value={analysis.mbti.includes("P") ? 75 : 25} className="h-2" />
                  <p className="text-sm mt-2 text-gray-600">{analysis.mbti_explanation["J/P"]}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Ratio Section */}
          <Card className="content-card">
            <CardHeader>
              <CardTitle className="text-2xl">콘텐츠 비율 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>전문분야</span>
                    <span className="font-medium">{analysis.content_ratio.expertise}</span>
                  </div>
                  <Progress value={getContentRatioPercentage(analysis.content_ratio.expertise)} className="h-3 bg-gray-200" indicatorClassName="bg-purple-600" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>에세이</span>
                    <span className="font-medium">{analysis.content_ratio.essay}</span>
                  </div>
                  <Progress value={getContentRatioPercentage(analysis.content_ratio.essay)} className="h-3 bg-gray-200" indicatorClassName="bg-indigo-500" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>여행</span>
                    <span className="font-medium">{analysis.content_ratio.travel}</span>
                  </div>
                  <Progress value={getContentRatioPercentage(analysis.content_ratio.travel)} className="h-3 bg-gray-200" indicatorClassName="bg-blue-500" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>자기계발</span>
                    <span className="font-medium">{analysis.content_ratio.self_improvement}</span>
                  </div>
                  <Progress value={getContentRatioPercentage(analysis.content_ratio.self_improvement)} className="h-3 bg-gray-200" indicatorClassName="bg-purple-400" />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  {analysis.summary_explanation}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Keywords Section */}
          <Card className="content-card">
            <CardHeader>
              <CardTitle className="text-2xl">핵심 키워드</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {analysis.keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-lg font-medium"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notable Quotes Section */}
          <Card className="content-card">
            <CardHeader>
              <CardTitle className="text-2xl">인상적인 문장</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analysis.quotes.map((quote, index) => (
                  <div key={index}>
                    <blockquote className="italic border-l-4 border-purple-500 pl-4 py-2 text-lg font-medium text-gray-700">
                      "{quote.quote}"
                    </blockquote>
                    <p className="mt-2 text-sm text-gray-600">
                      {quote.quote_explanation}
                    </p>
                    <a 
                      href={quote.source_link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-2 flex items-center text-sm text-purple-600 hover:text-purple-800"
                    >
                      <span>원본 글 보기</span>
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-purple-700 to-indigo-600">
            다른 블로그 분석하기
          </Button>
          <Button variant="outline" onClick={handleShareResult}>
            <Share2 className="mr-2 h-4 w-4" />
            결과 공유하기
          </Button>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2023 블로그 성향 분석기. 모든 분석 결과는 AI에 의해 생성되며 정확도는 보장되지 않습니다.</p>
        </footer>
      </div>
    </div>
  );
};

export default Report;
