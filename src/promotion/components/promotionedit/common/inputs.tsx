import {Field, useField} from 'formik';
import {useRef, useState, useEffect} from 'react';
import upload_icon from '../../../img/upload_icon.png';
import Calendar, {CalendarProps} from 'react-calendar';
import {useFormikContext} from 'formik';
import calendar_icon from '../../../img/calendar_icon.png';
import calendar_icon_white from '../../../img/calendar_icon_white.png';
import 'react-calendar/dist/Calendar.css';
import TextareaAutosize from 'react-textarea-autosize';
export const CustomTextInput = ({label, ...props}:any) => {
  
const [field, meta] = useField(props);
  return (
    
    <div className = "mb-30px">
      <label htmlFor={props.id || props.name} className='pl-6px text-md font-normal text-system-black'>{label}</label>
      <input className='w-full mt-10px h-48px border border-gray-2 rounded-lg px-4' {...field} {...props} />
       {meta.touched && meta.error ? (
        <div className="text-red-600 text-sm mt-2">{meta.error}</div>
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
        <div className="text-red-600 text-sm mt-2">{meta.error}</div>
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
        <div className="text-red-600 text-sm mt-2">{meta.error}</div>
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
    if (initialval.length) {
      setPreview(initialval[0]);
      helpers.setValue([initialval[0]]);
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
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하로 업로드 가능합니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
          helpers.setValue(file); // Formik value 설정
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
    helpers.setValue(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 파일 인풋 값을 초기화
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
        <div className='flex flex-row justify-center items-center rounded-lg border-gray-1 border-1px p-14px mt-10px hover:bg-gray-1 w-1/3'>
          <img src={upload_icon} className='h-4 w-4' alt="Upload icon"></img>
          <div className='text-gray-3 text-sm'>
            업로드 (JPG, PNG 5MB)
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
export const CustomDateInput = ({label, ...props}:any) => {
  const [field, meta, helpers] = useField(props);
  const {initialval} = props;
  const [hasSelected, setHasSelected] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  useEffect(()=>{
    if(initialval !== ''){
      setSelectedDate(new Date(initialval));
      setHasSelected(true);
    }
  },[])
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      helpers.setValue(value.toISOString().split('T')[0]); // Formik value 설정
      setShowCalendar(false);
    }
  };

  const handleButtonClick = () => {
    helpers.setTouched(true);
    setShowCalendar(!showCalendar);
  };

  const formattedDate = `${selectedDate.toLocaleDateString()} ${WEEKDAY[selectedDate.getDay()]}`;

  return (
    <div className="mb-30px">
      <label htmlFor={props.id || props.name} className='pl-6px text-md font-normal text-system-black'>{label}</label>
      <br/>
      <button
        type="button"
        className='flex flex-row justify-center items-center rounded-lg border-gray-1 border-1px p-14px mt-10px hover:bg-gray-1'
        onClick={handleButtonClick}
      >
        <div className='flex flex-row justify-center items-center'>
          <img src={calendar_icon} className='h-4 w-4 mr-6px'></img>
          {!meta.touched && !hasSelected ? `날짜를 선택해주세요` : formattedDate}
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

export const CustomDateInputTicket = ({label, ...props}:any) => {
  const [field, meta, helpers] = useField(props);
  const {initialval} = props;
  const [hasSelected, setHasSelected] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const WEEKDAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  
  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      helpers.setValue(value.toISOString().split('T')[0]); // Formik value 설정
      setShowCalendar(false);
    }
  };

  const handleButtonClick = () => {
    helpers.setTouched(true);
    setShowCalendar(!showCalendar);
  };

  const formattedDate = `${selectedDate.toLocaleDateString()} ${WEEKDAY[selectedDate.getDay()]}`;

  return (
    <div className="mb-30px">
      <label htmlFor={props.id || props.name} className='pl-6px text-md font-normal text-system-white'>{label}</label>
      <br/>
      <button
        type="button"
        className='flex flex-row justify-center bg-gray-5 items-center rounded-lg border-gray-1 border-1px p-14px mt-10px hover:bg-gray-4'
        onClick={handleButtonClick}
      >
        <div className='flex flex-row justify-center items-center text-gray-1'>
          <img src={calendar_icon_white} className='h-4 w-4 mr-6px'></img>
          {!meta.touched && !hasSelected ? `날짜를 선택해주세요` : formattedDate}
        </div>
      </button>
      {showCalendar && (
        <div className="calendar-container bg-white w-300px items-center" style={{ position: 'absolute', zIndex: 1000}}>
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
      {error && <div className='text-red-600 text-sm mt-2 ml-2'>{error}</div>}
      {meta.touched && meta.error ? (
        <div className='text-red-600 text-sm mt-2'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CustomToggleSwitch = ({ label, ...props }: any) => {
  
}

export const CustomCounterInput = ({ label, ...props }: any) => {

}