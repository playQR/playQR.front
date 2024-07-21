import {Field, useField,ErrorMessage} from 'formik';
import {useRef, useState, useEffect, useCallback} from 'react';
import Calendar, {CalendarProps} from 'react-calendar';
import {useFormikContext} from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import { axiosAPI } from '../../../axios';

import upload_icon from '../../img/upload_icon.png';
import calendar_icon from '../../img/calendar_icon.png';
import calendar_icon_white from '../../img/calendar_icon_white.png';
import 'react-calendar/dist/Calendar.css';
import BankLoading from '../../../common/bankloading';

export const CustomTextInput = ({label, ...props}:any) => {
  
const [field, meta] = useField(props);
  return (
    
    <div className = "mb-30px">
      <label htmlFor={props.id || props.name} className='pl-6px text-md font-normal text-system-black'>{label}</label>
      <input className='w-full mt-10px h-48px border border-gray-2 rounded-lg px-4' {...field} {...props} />
       {meta.touched && meta.error ? (
        <div className="text-system-error text-sm mt-2">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const CustomTextInputDark = ({label, ...props}:any) => {
  
const [field, meta] = useField(props);
  return (
    
    <div className = "mb-30px">
      <label htmlFor={props.id || props.name} className='pl-6px text-md font-normal text-system-white'>{label}</label>
      <input className='w-full mt-10px h-48px rounded-lg px-4 bg-gray-5 text-system-white' {...field} {...props} />
       {meta.touched && meta.error ? (
        <div className="text-system-error text-sm mt-2">{meta.error}</div>
      ) : null}
    </div>
  )
}
export const CustomLongTextInput = ({label, ...props}:any) => {
  
  const [field, meta] = useField(props);
  return (
    <div className = "mb-30px">
      <label htmlFor={props.id || props.name} className='pl-6px text-md font-normal text-system-black mb-10px'>{label}</label>
      <TextareaAutosize
            className="w-full bg-gray-1 mt-10px text-system-black rounded-md p-14px placeholder-gray-2"
            placeholder={props.placeholder}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            minRows={10}
          />
        {meta.touched && meta.error ? (
        <div className="text-system-error text-sm mt-2">{meta.error}</div>
      ) : null}
    </div>
  )
}
export const CustomFileInput = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const { setValues, values } = useFormikContext();
  const [preview, setPreview] = useState<string| null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { initialval } = props;
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialval) {
      const ival = initialval[0];
      if (typeof ival === 'string') {

        setPreview(ival);
        helpers.setValue([ival]);
      } else if (ival instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
          
            setPreview(reader.result);
            helpers.setValue(ival);
            setValues({ ...values as String[], imageList: [ival] });
        }
        };
        reader.readAsDataURL(ival);
      }
    }
  }, [initialval, helpers]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
      if (file.size > Number(process.env.REACT_APP_IMAGE_FILE_LIMITATION)) {
        alert(`파일 크기는 ${Number(process.env.REACT_APP_IMAGE_FILE_LIMITATION)/(1024*1024)}MB 이하로 업로드 가능합니다.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          
          setPreview(reader.result);
          helpers.setValue(file);
          setValues({ ...values as String[], imageList: [file] });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    setPreview(null);
    helpers.setValue([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className='mb-30px flex flex-col'>
      <label htmlFor="files" className="">{label}</label>
      <br />
      <input
        className='mt-10px'
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
        style={{ display: 'none' }}
        {...props}
      />
      <button type="button" className="custom-button" onClick={handleClick}>
        <div className='flex flex-row justify-center items-center rounded-lg border-gray-1 border-1px p-14px mt-10px hover:bg-gray-1 w-1/2'>
          <img src={upload_icon} className='h-4 w-4' alt="Upload icon"></img>
          <div className='text-gray-3 text-sm'>
            {`업로드 (JPG, PNG ${Number(process.env.REACT_APP_IMAGE_FILE_LIMITATION)/(1024*1024)}MB)`}
          </div>
        </div>
      </button>
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
      {preview && (
        <div className='flex flex-row w-full mt-10px items-end'>
          <div className=" w-300px h-300px mr-10px">
            <img
              src={preview}
              alt="preview"
              className="min-w-full h-full cursor-pointer object-contain rounded-lg border-gray-3 border-1px bg-gray-1"
              onClick={() => {
                setCurrentPreview(preview);
                setShowFullScreen(true);
              }}
            />
            
          </div>
          <button
              type="button"
              onClick={handleRemove}
              className="h-8 text-psm bg-system-white text-system-error hover:text-system-white hover:bg-system-error text-center border-system-error border-1px px-10px py-1 rounded-md"
            >
              삭제
            </button>
          </div>
      )}
      {showFullScreen && currentPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => {
              setShowFullScreen(false);
              setCurrentPreview(null);
            }}
          >
            X
          </button>
          <img src={currentPreview} alt="fullscreen preview" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
};

export const CustomDateInput = ({ label, ...props }:any) => {
  const [field, meta, helpers] = useField(props);
  const [formattedDate, setFormattedDate] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);
  const {initialVal} = props;
  const { setValue } = helpers;
  const [hasSelected, setHasSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(()=>{
    console.log(initialVal)
    if(initialVal!==''){
      setSelectedDate(new Date(initialVal));
      setFormattedDate(formatDateWithWeekday(initialVal))
      setHasSelected(true);
    }
  },[])

  const handleShowPicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus()
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (e:any) => {
  const dateValue = e.target.value;
  alert(dateValue)
  if (dateValue) {
    setHasSelected(true);
    const formatted = formatDateWithWeekday(dateValue);
    helpers.setValue(dateValue);
    setFormattedDate(formatted);
  } else {
    setFormattedDate('');
  }
};

  const formatDateWithWeekday = (date : any) => {
    const dateObject = new Date(date);
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const weekday = weekdays[dateObject.getDay()];

    return `${year}.${month}.${day} ${weekday}`;
  };

  return (

      <div className="flex flex-col">
        <label htmlFor={props.id || props.name} className='text-md font-normal text-system-black mb-3'>{label}</label>
        <div className="relative mb-3 w-1/2 p-3 border-1px border-gray-200 rounded-lg" onClick={handleShowPicker}>
          <input
            ref={dateInputRef}
            type="date"
            name="showDate"
            data-placeholder="날짜 선택"
            className='date-input p-3 border border-gray-300 w-full pl-10 rounded-lg'
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
            value={formattedDate ? formattedDate : undefined}
          />
          <div className="absolute inset-y-0 left-0 flex w-full items-center cursor-pointer justify-center">
            <img src={calendar_icon} className="w-5 h-5 text-gray-500" alt="Calendar Icon" />
            <div className='ml-3 text-md font-normal text-system-black'>
              {!hasSelected ? "날짜를 선택해주세요" :formattedDate}
            </div>
          </div>
        </div>
        {meta.touched && meta.error ? <div style={{ color: 'red' }}>{meta.error}</div> : null}
      </div>

  );
}

export const CustomDateInputTicket = ({label, ...props}:any) => {
  const [field, meta, helpers] = useField(props);
  const [formattedDate, setFormattedDate] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);
  const {initialVal} = props;
  const { setValue } = helpers;
  const [hasSelected, setHasSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(()=>{
    console.log(initialVal)
    if(initialVal!==''){
      setSelectedDate(new Date(initialVal));
      setFormattedDate(formatDateWithWeekday(initialVal))
      setHasSelected(true);
    }
  },[])

  const handleShowPicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (e:any) => {
  const dateValue = e.target.value;
  if (dateValue) {
    setHasSelected(true);
    const formatted = formatDateWithWeekday(dateValue);
    helpers.setValue(dateValue);
    setFormattedDate(formatted);
  } else {
    setFormattedDate('');
  }
};

  const formatDateWithWeekday = (date : any) => {
    const dateObject = new Date(date);
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const weekday = weekdays[dateObject.getDay()];

    return `${year}.${month}.${day} ${weekday}`;
  };

  return (

      <div className="flex flex-col mb-30px">
        <label htmlFor={props.id || props.name} className='text-md font-normal text-system-white mb-3'>{label}</label>
        <div className="relative mb-3 w-1/2 border-1px border-gray-200 rounded-lg">
          <input
            ref={dateInputRef}
            type="date"
            name="showDate"
            data-placeholder="날짜 선택"
            className='date-input p-3 border border-gray-300 w-full pl-10 rounded-lg'
            onChange={handleDateChange}
            min={new Date().toISOString().split('T')[0]}
            value={formattedDate === '' || formattedDate === undefined ? formattedDate : undefined}
          />
          <div className="absolute inset-y-0 left-0 flex w-full items-center cursor-pointer justify-center">
            <img src={calendar_icon_white} className="w-5 h-5 text-gray-500" onClick={handleShowPicker} alt="Calendar Icon" />
            <div className='ml-3 text-md font-normal text-system-white' onClick={handleShowPicker}>
              {!hasSelected ? "날짜를 선택해주세요" :formattedDate}
            </div>
          </div>
        </div>
        {meta.touched && meta.error ? <div style={{ color: 'red' }}>{meta.error}</div> : null}
      </div>
  );
}

export const CustomTimeInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  const { setValues, values } = useFormikContext();
  const {initialval} = props;
  const [smeridian, setsMeridian] = useState('오전');
  const [shour, setsHour] = useState(12);
  const [sminute, setsMinute] = useState(0);
  const [lmeridian, setlMeridian] = useState('오전');
  const [lhour, setlHour] = useState(12);
  const [lminute, setlMinute] = useState(0);
  const [error, setError] = useState('');
  const {setIsValidTime} = props;
  useEffect(()=>{
    if(initialval){
      const {smeridian, shour, sminute, lmeridian, lhour, lminute} = initialval;
      setsMeridian(smeridian);
      setsHour(shour);
      setsMinute(sminute);
      setlMeridian(lmeridian);
      setlHour(lhour);
      setlMinute(lminute);
    }
  },[])
  useEffect(() => {
    validateAndSetTime();
  }, [smeridian, shour, sminute, lmeridian, lhour, lminute]);

  const validateAndSetTime = () => {
    const start = parseTime(smeridian, shour, sminute);
    const end = parseTime(lmeridian, lhour, lminute);

    if (start >= end) {
      setError('종료 시간은 시작 시간보다 늦어야 합니다.');
      setIsValidTime(false);
    } else {
      setError('');
      setValues({ ...values as Object, time: { smeridian, shour, sminute, lmeridian, lhour, lminute }});
      setIsValidTime(true);
    }
  };

  const parseTime = (meridian: string, hour: number, minute: number) => {
    if (meridian === '오후' && hour !== 12) {
      hour += 12;
    }
    if (meridian === '오전' && hour === 12) {
      hour = 0;
    }
    return hour * 60 + minute;
  };

  return (
    <div className="mb-30px w-full">
      <label htmlFor={props.id || props.name} className="pl-6px text-md font-normal text-system-black">{label}</label>
      <div className="flex flex-row w-full mt-10px h-48px">
        <div className="w-1/2 flex flex-row">
          <Field as="select" 
            name="smeridian" 
            className="w-1/2 m-1 border-none outline-none text-center"
            onChange={(e : any ) => setsMeridian(e.target.value)}
            value={smeridian}
            >
            <option value="오전">오전</option>
            <option value="오후">오후</option>
          </Field>
          <div className='flex h-full w-1/2 p-1 text-center'>
            <Field as='input'
              name='shour'
              type='number'
              min={1}
              max={12}
              className='w-1/2 bg-gray-1 rounded-l-lg text-center outline-none'
              onChange={(e : any) => setsHour(e.target.value)}
              value={shour}
              />
            <span className="flex items-center justify-self-center h-full text-center bg-gray-1">:</span>
            <Field as='input'
              name='sminute'
              type='number'
              min={0}
              max={59}
              className='w-1/2 bg-gray-1 border-gray-2 rounded-r-lg text-center outline-none'
              onChange={(e : any) => setsMinute(e.target.value)}
              value={sminute}
              />
          </div>
          </div>
          <span className="self-center">~</span>
          <div className="w-1/2 flex flex-row">
            <Field as="select" 
              name="lmeridian" 
              className="w-1/2 m-1 border-none outline-none text-center"
              onChange={(e : any) => setlMeridian(e.target.value)}
              value={lmeridian}
              >
              <option value="오전">오전</option>
              <option value="오후">오후</option>
            </Field>
            <div className='flex h-full w-1/2 p-1 text-center '>
              <Field as='input'
                name='lhour'
                type='number'
                min={0}
                max={12}
                className='w-1/2 bg-gray-1 rounded-l-lg text-center outline-none'
                onChange={(e : any) => setlHour(e.target.value)}
                value={lhour}
                />
              <span className="flex items-center justify-self-center h-full text-center bg-gray-1">:</span>
              <Field as='input'
                name='lminute'
                type='number'
                min={0}
                max={59}
                className='w-1/2 bg-gray-1 border-gray-2 rounded-r-lg text-center outline-none'
                onChange={(e : any) => setlMinute(e.target.value)}
                value={lminute}
                />
            </div>
          </div>

      </div>
      {error && <div className='text-system-error text-sm mt-2 ml-2'>{error}</div>}
      {meta.touched && meta.error ? (
        <div className='text-system-error text-sm mt-2'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CustomSelectionInput = ({ label, ...props }: any) => {
  const [items, setItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = useCallback(
    async () => {
      try {
        const response = await axiosAPI.get('/api/promotions/bank/type');
        setItems(response.data.result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setIsLoading(false);
      }
    }
  ,[items])

  useEffect(() => {
    fetchItems();
  }, []);

  
  return (
     <div className='w-full flex flex-col'>
        <label htmlFor="account">{label}</label>
        {isLoading ?<BankLoading text='은행 목록 가져오는 중' isLoading={isLoading}/> : <div className='mt-10px w-full mb-10px'>
        <Field as="select" name="bankName" label="은행을 골라주세요" className="p-4 rounded-xl mb-2">
          
          {items.map(item => (
            <option value={item} key={item} className='p-10'>
              {item}
            </option>
          ))}
        </Field>
        <ErrorMessage name="bankName" component="div" className='text-system-error text-psm'/></div>
        }
        
    </div>
  )
}