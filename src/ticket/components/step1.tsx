import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

interface FormData {
  textInput1: string;
  textInput2: string;
  images: Array<string>; // S3 URL을 저장
  date: Date;
  startTime: Date;
  endTime: Date;
  textInput3: string;
}

interface StepProps {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  nextStep: () => void;
}

const Step1: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date: Date | null, event: React.SyntheticEvent<any> | undefined, name: keyof FormData) => {
  if (date) { // null 체크
    setFormData({ ...formData, [name]: date });
  }
};

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const urls = await Promise.all(files.map(file => uploadImage(file)));
      setFormData({ ...formData, images: urls });
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    // 가정: 이미지를 Amazon S3에 업로드하는 API 엔드포인트
    const response = await axios.post("https://yourapi.com/upload", formData);
    return response.data.url; // 가정: 응답에 URL이 포함되어 있다.
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
      <input type="text" name="textInput1" value={formData.textInput1} onChange={handleInputChange} />
      <input type="text" name="textInput2" value={formData.textInput2} onChange={handleInputChange} />
      <input type="file" multiple onChange={handleImageUpload} />
      {formData.images.map((src, index) => (
        <img key={index} src={src} alt="Preview" style={{ width: 300, height: 300 }} />
      ))}
      <DatePicker
        selected={formData.date}
        onChange={(date, event) => handleDateChange(date, event, 'date')}
        locale="ko"
        dateFormat="yyyy/MM/dd"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DatePicker
          selected={formData.startTime}
          onChange={(date, event) => handleDateChange(date, event, 'startTime')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="시작 시간"
          dateFormat="h:mm aa"
        />
        <DatePicker
          selected={formData.endTime}
          onChange={(date, event) => handleDateChange(date, event, 'endTime')}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="종료 시간"
          dateFormat="h:mm aa"
        />
      </div>
      <input type="text" name="textInput3" value={formData.textInput3} onChange={handleInputChange} />
      <button type="submit">Next</button>
    </form>
  );
};

export default Step1;
