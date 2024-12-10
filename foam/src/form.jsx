import React from "react";
import { useState, useEffect } from "react";
import './App.css'

function Foam() {

    // 各項目の初期値を設定する
    const [formData, setFormData] = useState({
        名前: "",
        年齢: "",
        メールアドレス: "",
        問い合わせ内容: "",
        その他: "",
    });
    
    // フィールドごとのエラーメッセージを管理
    const [errors, setErrors] = useState({}); 

    // ポップアップの表示・非表示を管理
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // ポップアップの横幅を管理
    const [popupWidth, setPopupWidth] = useState("auto");

    // ポップアップの横幅の上限を設定
    const MAX_WIDTH = 600; 

    // ポップアップの横幅の最小値を設定
    const MIN_WIDTH = 300; 


    // 更新の処理
    const handleChange = (e) => {

        // 入力された内容をリアルタイムで更新
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));

        {/* なぜか機能しない...泣 */}
        // 入力が行われたらエラーをクリア
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            if (value) {
              delete updatedErrors[id]; // 入力済みの場合、該当フィールドのエラーを削除
            } else {
              updatedErrors[id] = `${id}を入力してください。`; // 再度空になった場合エラーを設定
            }
            return updatedErrors;
        });
    };


    // 確認の処理
    const handleConfirm = () => {

        // 必須項目のチェック
        const newErrors = {};
        if (!formData.名前) newErrors.name = "名前を入力してください。";
        if (!formData.年齢) newErrors.age = "年齢を入力してください。";
        if (!formData.メールアドレス) newErrors.address = "メールアドレスを入力してください。";
        if (!formData.問い合わせ内容) newErrors.contents = "問い合わせ内容を入力してください。";
        
        // エラー状況を更新
        setErrors(newErrors);
    
        // エラーがない場合のみポップアップを表示
        if (Object.keys(newErrors).length === 0) {
          setIsPopupVisible(true);
        }
      };
    

    // 送信の処理
    const handleSend = () => {

        // アラートとコンソールに表示
        alert("送信完了しました！", formData);
        console.log("フォーム内容:", formData);

        // ローカルストレージにデータを配列形式で保存
        const existingData = JSON.parse(localStorage.getItem("formDataList")) || [];

        // 新しいデータを追加
        const updatedData = [...existingData, formData]; 

        // 再度、データをローカルストレージに保存
        localStorage.setItem("formDataList", JSON.stringify(updatedData));

        // ポップアップを閉じる
        setIsPopupVisible(false);
    };

    
    // ポップアップを閉じる
    const closePopup = () => {
        setIsPopupVisible(false);
    };

    // ポップアップの横幅を動的に設定
    useEffect(() => {
        if (isPopupVisible) {
            // 全ての入力値を連結して、その長さに基づいて横幅を決定
            const totalLength = Object.values(formData).join("").length;
            const calculatedWidth = Math.max(
                MIN_WIDTH,
                Math.min(MAX_WIDTH, totalLength * 10) // 最小幅を超え、上限を超えない範囲で横幅を設定
            );
            setPopupWidth(`${calculatedWidth}px`);
        }
    }, [isPopupVisible, formData]);

    {/* HTMLを表示 */}
    return (
        <>
        <div className="inquiry-container">
            {/* 入力エリア */}
            <div className="foam-area">
                <div className="input-area1">
                    <h3>名前</h3>
                    <input 
                        type="text" id="名前" 
                        className={`input1 ${errors.name ? "error-field" : ""}`} // エラー発生時にエラーCSSを付ける
                        placeholder="名前を入力"
                        value={formData.名前}
                        onChange={handleChange}
                        required
                    />
                    {/* エラーメッセージを表示 */}
                    {errors.name && 
                        <p className="error-message1">
                            {errors.name} 
                        </p>
                    }
                </div>
                <div className="input-area2">
                    <h3>年齢</h3>
                    <input 
                        type="text" id="年齢" 
                        className={`input2 ${errors.age ? "error-field" : ""}`} // エラー発生時にエラーCSSを付ける
                        placeholder="年齢を入力"
                        value={formData.年齢}
                        onChange={handleChange}
                        required
                    />
                    {/* エラーメッセージを表示 */}
                    {errors.age && 
                        <p className="error-message2">
                            {errors.age} 
                        </p>
                    }
                </div>
                <div className="input-area3">
                    <h3>メールアドレス</h3>
                    <input 
                        type="text" id="メールアドレス" 
                        className={`input3 ${errors.address ? "error-field" : ""}`} // エラー発生時にエラーCSSを付ける
                        placeholder="メールアドレスを入力"
                        value={formData.メールアドレス}
                        onChange={handleChange}
                        required
                    />
                    {/* エラーメッセージを表示 */}
                    {errors.address && 
                        <p className="error-message3">
                            {errors.address} 
                        </p>
                    }
                </div>
                <div className="input-area3">
                    <h3>問い合わせ内容</h3>
                    <input
                        type="text" id="問い合わせ内容" 
                        className={`input3 ${errors.contents ? "error-field" : ""}`} // エラー発生時にエラーCSSを付ける
                        placeholder="問い合わせ内容を入力"
                        value={formData.問い合わせ内容}
                        onChange={handleChange}
                        required
                    />
                    {/* エラーメッセージを表示 */}
                    {errors.contents && 
                        <p className="error-message3">
                            {errors.contents} 
                        </p>
                    }
                </div>
                <div className="input-area3">
                    <h3>その他</h3>
                    <input
                        type="text" id="その他" 
                        className="input3"
                        placeholder="その他"
                        value={formData.その他}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="btn-area">
                <h3>上記、入力完了後に下記のボタンを押してください</h3> 
                <button id="checkbtn" className="btn" onClick={handleConfirm}>確認</button>
            </div>
            {/* ポップアップ */}
            {isPopupVisible && (
                <div className="popup-area">
                    <div className="popup" style={{ width: popupWidth }}>
                        <button class="closebtn" onClick={closePopup}>✕</button>
                        <h3>お問い合わせ内容の確認</h3>
                        <p>
                            確認・編集が可能です！<br />
                            『送信』を押して問い合わせを完了してください。
                        </p>
                        {Object.keys(formData).map((key) => (
                            <div key={key} className="popup-input-area">
                                <h4>{key}</h4>
                                <textarea
                                    type="text"
                                    id={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="popup-textarea"
                                />
                            </div>
                        ))}
                        <button className="sendbtn" onClick={handleSend}>送信</button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default Foam;