type Props = {
    title: string[];
    currentStepIndex: number;
}

const FormNav = (props: Props) => {
    const { title, currentStepIndex } = props;
    return (
        <div className="">
            <div className='flex flex-row w-full pb-10px justify-center items-stretch'>
                {title.map((t, index) => (
                    <div
                        key={index}
                        className={`w-1/3 text-center text-sm font-normal ${
                        index <= currentStepIndex ? 'text-primary' : 'text-gray-2'
                        }`}
                    >
                        {t}
                    </div>
                ))}
            </div>
            <div className='flex flex-row w-full justify-center items-stretch'>
                {title.map((t, index) => (
                    <div
                        key={index}
                        className={`w-full h-4px transition-all duration-1000 ease-in-out ${
                        index <= currentStepIndex ? 'bg-primary' : 'bg-gray-2'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default FormNav;