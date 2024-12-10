import React from "react";
import { useState, useEffect } from "react";
import './App.css'

function List() {

    // ローカルストレージに一時保存された問い合わせ内容を配列形式で取得
    const [formDataList, setFormDataList] = useState([]);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("formDataList")) || [];
        setFormDataList(data);
    }, []);

    // 項目を削除する処理
    const handleDelete = (index) => {

        // 指定したインデックスを除外
        const updatedList = formDataList.filter((_, i) => i !== index); 

        // 状態を更新
        setFormDataList(updatedList); 

        // ローカルストレージを更新
        localStorage.setItem("formDataList", JSON.stringify(updatedList)); 
    };

    {/* HTMLを表示 */}
    return (
        <>
        <div className="inquiry-container">
            {/* 確認エリア */}
            <div className="list-area">
                <h1>送信された内容</h1>
                <ul className="Sendlist">
                    {/* 例を表示 */}
                    <div className="list-0">
                        <li>例）</li>
                        <li>名前： たなか たろう</li>
                        <li>年齢： 11</li>
                        <li>メールアドレス： ✕✕✕✕@gmail.com</li>
                        <li>問い合わせ内容： ～～～～～～～～～</li>
                        <li>その他： </li>
                    </div>
                    {/* 入力内容をループで表示 */}
                    {formDataList.map((data, index) => (
                        <div key={index} className="list-1">
                            <li><strong>名前：</strong> {data.名前}</li>
                            <li><strong>年齢：</strong> {data.年齢}</li>
                            <li><strong>メールアドレス：</strong> {data.メールアドレス}</li>
                            <li><strong>問い合わせ内容：</strong> {data.問い合わせ内容}</li>
                            <li><strong>その他：</strong> {data.その他}</li>
                            <button className="btn" onClick={() => handleDelete(index)}>削除</button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}

export default List;