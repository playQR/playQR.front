import {useField} from 'formik';
import {useRef, useState} from 'react';
import upload_icon from '../../../img/upload_icon.png';
import Calendar, {CalendarProps} from 'react-calendar';
import {useFormikContext} from 'formik';
import calendar_icon_form from '../../../img/calendar_icon_form.png';
import 'react-calendar/dist/Calendar.css';
export const CustomTextInput = ({label, ...props}:any) => {
  
  const [field, meta] = useField(props);
  return (
    <div className = "mb-30px">
      <label htmlFor={props.id || props.name} className='pl-6px text-md font-normal text-system-black'>{label}</label>
      <input className='w-full mt-10px h-48px border border-gray-2 rounded-lg px-4' {...field} {...props} />
    </div>
  )
}
export const CustomFileInput = ({ label, ...props }:any) => {
  const [field, meta, helpers] = useField(props);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      const fileArray = Array.from(files);
      helpers.setValue(fileArray); // Formik value 설정
      const previewArray: string[] = [];
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            previewArray.push(reader.result);
            if (previewArray.length === fileArray.length) {
              setPreviews(previewArray);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleRemove = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    const newFiles = field.value.filter((_ : any, i:any) => i !== index);
    helpers.setValue(newFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input value
    }
  };

  return (
    <div className='mb-30px'>
      <label htmlFor="files" className="">{label}</label>
      <br />
     <input
        className='mt-10px'
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleChange}
         style={{ display: 'none' }}
        {...props}
      />
      <button type="button" className="custom-button" onClick={handleClick}>
        <div className='flex flex-row justify-center items-center rounded-lg border-gray-1 border-1px p-14px mt-10px hover:bg-gray-1'>
          <img src={upload_icon} className='h-4 w-4'></img>
          <div className='text-gray-3 text-sm'>
            업로드 (JPG, PNG 5MB)
          </div>
        </div>
        
      </button>
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
        {previews.map((preview, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img src={preview} alt={`Preview ${index}`} style={{ width: '300px', height: '300px' }} />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer'
              }}
            >
              x
            </button>
            </div>
        ))}
      </div>
    </div>
  );
}
export const CustomDateInput = ({label, ...props}:any) => {
  const [field, meta, helpers] = useField(props);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      helpers.setValue(value.toISOString().split('T')[0]); // Formik value 설정
      setShowCalendar(false);
    }
  };

  const handleButtonClick = () => {
    setShowCalendar(!showCalendar);
  };

  const formattedDate = selectedDate ? selectedDate.toLocaleDateString() : new Date(Date.now()).toISOString().split('T')[0];

  return (
    <div className="mb-30px">
      <label htmlFor={props.id || props.name} className='pl-6px text-md font-normal text-system-black'>{label}</label>
      <br />
      <button
        type="button"
        className='flex flex-row justify-center items-center rounded-lg border-gray-1 border-1px p-14px mt-10px hover:bg-gray-1'
        onClick={handleButtonClick}
      >
        <div className='flex flex-row justify-center items-center'>
          <img src={calendar_icon_form} className='h-4 w-4 mr-6px'></img>
          {formattedDate}
        </div>
      </button>
      {showCalendar && (
        <div className="calendar-container bg-white w-300px items-center" style={{ position: 'absolute', zIndex: 1000 }}>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date(Date.now())}
          />
        </div>
      )}
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  )

}
export const CustomTimeInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [smeridian, setsMeridian] = useState('오전');
  const [shour, setsHour] = useState('12');
  const [sminute, setsMinute] = useState('00');
  const [lmeridian, setlMeridian] = useState('오전');
  const [lhour, setlHour] = useState('12');
  const [lminute, setlMinute] = useState('00');
  const [error, setError] = useState('');

  const handleMeridianChange = (setMeridian: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setMeridian(value);
    validateAndSetTime();
  };

  const handleTimeChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    const numValue = value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거
    setter(numValue);
    validateAndSetTime();
  };

  const validateAndSetTime = () => {
    const start = parseTime(smeridian, shour, sminute);
    const end = parseTime(lmeridian, lhour, lminute);

    if (start >= end) {
      setError('종료 시간은 시작 시간보다 늦어야 합니다.');
    } else {
      setError('');
      const startTime = `${smeridian} ${shour}:${sminute}`;
      const endTime = `${lmeridian} ${lhour}:${lminute}`;
      setFieldValue(props.name, { startTime, endTime });
    }
  };

  const parseTime = (meridian: string, hour: string, minute: string) => {
    let h = parseInt(hour, 10);
    if (meridian === '오후' && h !== 12) {
      h += 12;
    }
    if (meridian === '오전' && h === 12) {
      h = 0;
    }
    const m = parseInt(minute, 10);
    return h * 60 + m;
  };

  return (
    <div className="mb-30px">
      <label htmlFor={props.id || props.name} className="pl-6px text-md font-normal text-system-black">{label}</label>
      <div className="flex flex-row w-full mt-10px h-48px border border-gray-2 rounded-lg">
        <div className="w-1/2 flex flex-row items-stretch">
          <select
              value={smeridian}
              onChange={(e) => handleMeridianChange(setsMeridian, e.target.value)}
              className="w-1/3 border-none outline-none text-center"
            >
              <option value="오전">오전</option>
              <option value="오후">오후</option>
            </select>
            <input
              type="number"
              value={shour}
              onChange={(e) => handleTimeChange(setsHour, e.target.value)}
              min="1"
              max="12"
              className="w-1/3 border-l border-r border-gray-2 text-center outline-none"
            />
            <span className="self-center">:</span>
            <input
              type="number"
              value={sminute}
              onChange={(e) => handleTimeChange(setsMinute, e.target.value)}
              min="00"
              max="59"
              className="w-1/3 border-l border-gray-2 text-center outline-none"
            />
        </div>
        <span className="self-center">~</span>
        <div className="w-1/2 flex flex-row">
          <select
            value={lmeridian}
            onChange={(e) => handleMeridianChange(setlMeridian, e.target.value)}
            className="w-1/3 border-none outline-none text-center"
          >
            <option value="오전">오전</option>
            <option value="오후">오후</option>
          </select>
          <input
            type="number"
            value={lhour}
            onChange={(e) => handleTimeChange(setlHour, e.target.value)}
            min="1"
            max="12"
            className="w-1/3 border-l border-r border-gray-2 text-center outline-none"
          />
          <span className="self-center">:</span>
          <input
            type="number"
            value={lminute}
            onChange={(e) => handleTimeChange(setlMinute, e.target.value)}
            min="00"
            max="59"
            className="w-1/3 border-l border-gray-2 text-center outline-none"
          />
        </div>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};