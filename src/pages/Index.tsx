
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ChevronRight, ExternalLink } from "lucide-react";

const Index = () => {
  const [blogUrl, setBlogUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!blogUrl) {
      toast.error("블로그 주소를 입력해주세요");
      return;
    }

    // Simple URL validation
    if (!blogUrl.startsWith('http')) {
      toast.error("유효한 URL을 입력해주세요");
      return;
    }

    setIsLoading(true);

    // Simulate API call (replace with actual API call)
    try {
      // In a real implementation, you would call your API here
      // For now, just navigate to the report page with the URL as a param
      setTimeout(() => {
        navigate(`/report?url=${encodeURIComponent(blogUrl)}`);
      }, 1500);
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("분석 중 오류가 발생했습니다. 다시 시도해주세요");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-16 md:py-28 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text animate-fade-in">
            블로그 성향 분석기
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            블로그 링크만 입력하면 AI가 당신의 글쓰기 성향을 분석해 드려요!
          </p>

          <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <Input
              type="text"
              value={blogUrl}
              onChange={(e) => setBlogUrl(e.target.value)}
              placeholder="블로그 URL을 입력하세요"
              className="flex-1 h-12 px-4 text-base"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="h-12 px-8 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2">분석중</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </>
              ) : (
                <>분석하기<ChevronRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">나의 블로그는 어떤 성향일까요?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="content-card">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">성향 분석</h3>
              <p className="text-gray-600">
                당신의 글쓰기 스타일과 성향을 AI가 정확하게 분석해 드립니다.
              </p>
            </div>
            
            <div className="content-card">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">MBTI 예측</h3>
              <p className="text-gray-600">
                글쓰기 패턴을 기반으로 당신의 MBTI 성격 유형을 예측합니다.
              </p>
            </div>
            
            <div className="content-card">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">콘텐츠 비율</h3>
              <p className="text-gray-600">
                당신의 콘텐츠는 어떤 주제에 집중되어 있는지 분석해 드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">이용 방법</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-purple-700">1</div>
              <h3 className="text-xl font-semibold mb-2">블로그 링크 입력</h3>
              <p className="text-gray-600">
                분석하고 싶은 블로그의 URL을 입력하세요.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-purple-700">2</div>
              <h3 className="text-xl font-semibold mb-2">AI 분석</h3>
              <p className="text-gray-600">
                AI가 최대 10개의 글을 분석하여 성향을 파악합니다.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-purple-700">3</div>
              <h3 className="text-xl font-semibold mb-2">결과 확인</h3>
              <p className="text-gray-600">
                당신의 블로그 성향과 특징에 대한 상세한 분석 결과를 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 mt-auto border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 sm:mb-0">© 2023 블로그 성향 분석기. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-purple-700">이용약관</a>
            <a href="#" className="text-gray-500 hover:text-purple-700">개인정보처리방침</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
