import s from './style.module.scss';
import { ReactComponent as DrawIcon } from './assets/draw.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("글 생성하기");
    const navigate = useNavigate();

    const generateBlog = async () => {
        setIsLoading(true);

        // 애니메이션 효과를 위한 setInterval
        const intervalId = setInterval(() => {
            setLoadingText((prev) => {
                switch (prev) {
                    case "생성 중": return "생성 중.";
                    case "생성 중.": return "생성 중..";
                    case "생성 중..": return "생성 중...";
                    case "생성 중...": return "생성 중";
                    default: return "생성 중";
                }
            });
        }, 500);

        try {
            const response = await fetch("http://127.0.0.1:8000/content/generate/api/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            // 요청이 실패한 경우
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error || "Something went wrong");
                return;
            }

            const data = await response.json();
            navigate('/blog', { state: { title: data.title, content: data.content } });
        } catch (error) {
            alert("Failed to connect to the server. Please try again later.");
        } finally {
            clearInterval(intervalId); // 애니메이션 중지
            setLoadingText("글 생성하기"); // 기본 텍스트로 복구
            setIsLoading(false);
        }
    };

    return (
        <div className={s.screen}>
            <div className={s.titleContainer}>
                <h1>GENLOG</h1>
                <p>간단한 키워드 몇개로 블로그 날먹하기</p>
            </div>

            <div className={s.generateContainer}>
                <div className={s.generateInput}>
                    <DrawIcon />
                    <span></span>
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter a prompt..."
                        disabled={isLoading} // 로딩 중엔 입력 비활성화
                    />
                </div>
                <button
                    className={s.generateButton}
                    onClick={generateBlog}
                    disabled={isLoading} // 로딩 중엔 버튼 비활성화
                >
                    <p>{loadingText}</p>
                </button>
            </div>
        </div>
    );
};

export default Landing;
