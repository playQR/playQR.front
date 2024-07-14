import React, { useState } from 'react';
import { Formik, Form, FieldProps, FieldArray, Field, ErrorMessage, FormikProps, FieldArrayRenderProps } from 'formik';
import * as Yup from 'yup';
import NextButton from './nextbutton';
import { CustomLongTextInput } from './common/inputs';
import { MusicInput } from '../../types';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import BackButton from './backbutton';
import store from '../../../store/store';

type Props = {
  next: () => void;
  prev: () => void;
  currentIndex: number;
};

type IFormInput = {
  musicList?: MusicInput[];
  content?: string;
};

const CustomToggleSwitch: React.FC<FieldProps> = ({ field, form }) => {
  return (
    <label className="relative inline-block w-12 h-6">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        {...field}
        checked={field.value}
        onChange={() => {
          form.setFieldValue(field.name, !field.value);
        }}
      />
      <span
        className={`absolute cursor-pointer inset-0 transition-colors duration-300 ease-in-out
                   ${field.value ? 'bg-green-400' : 'bg-gray-400'} rounded-full`}
      >
        <span
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out
                     ${field.value ? 'translate-x-6' : 'translate-x-0'}`}
        />
      </span>
    </label>
  );
};

const validationSchema = Yup.object({
  musicList: Yup.array().of(
    Yup.object({
      title: Yup.string().required('곡 제목은 필수 항목입니다.'),
      artist: Yup.string().required('가수는 필수 항목입니다.'),
      open: Yup.boolean(),
    })
  ),
  content: Yup.string().required('공연 설명은 필수 항목입니다.'),
});

const Step2 = (props: Props) => {
  const { useCreatePromotionStore } = store;
  const { updateData,getFullPromotionData } = useCreatePromotionStore();
  const { next, prev, currentIndex } = props;
  const [initialVal, setInitialVal] = useState<IFormInput>(getFullPromotionData().step2);

  return (
    <div className="w-full bg-system-white p-4">
      <BackButton prev={prev} />
      <div className="text-pmd ml-6px mb-10px">셋리스트를 알려주세요</div>
      <Formik
        initialValues={initialVal}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
          updateData({ step2: values });
          setSubmitting(false);
          next();
        }}
      >
        {(formikProps: FormikProps<IFormInput>) => (
          <Form className="space-y-4 w-full mt-10px">
            <FieldArray name="musicList">
              {(arrayHelpers: FieldArrayRenderProps) => (
                <DragDropContext
                  onDragEnd={(result: DropResult) => {
                    if (!result.destination) {
                      return;
                    }
                    arrayHelpers.move(result.source.index, result.destination.index);
                  }}
                >
                  <Droppable droppableId="droppable">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {formikProps?.values?.musicList?.map((music, index) => (
                          <Draggable key={index} draggableId={`${index}`} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex w-full mb-4"
                              >
                                <div className="flex w-5/6 flex-col p-10px border-gray-1 border-1px bg-system-white rounded-xl place-content-between">
                                  <div className="flex flex-col">
                                    <Field
                                      name={`musicList.${index}.title`}
                                      type="text"
                                      placeholder="곡 제목을 입력해주세요"
                                      className="h-36px px-2 text-psm rounded-md bg-gray-1 mb-6px"
                                    />
                                    <ErrorMessage
                                      name={`musicList.${index}.title`}
                                      component="div"
                                      className="text-system-error text-xs"
                                    />
                                    <Field
                                      name={`musicList.${index}.artist`}
                                      type="text"
                                      placeholder="가수를 입력해주세요"
                                      className="h-36px px-2 text-psm rounded-md bg-gray-1"
                                    />
                                    <ErrorMessage
                                      name={`musicList.${index}.artist`}
                                      component="div"
                                      className="text-system-error text-xs"
                                    />
                                  </div>
                                  <div className="flex flex-row w-full items-center justify-between">
                                    <div className="flex flex-row items-center justify-center">
                                      <span className="text-psm mr-10px">곡 공개</span>
                                      <Field name={`musicList.${index}.open`} component={CustomToggleSwitch} />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                      className="text-psm text-system-error text-center border-system-error border-1px px-10px py-1 rounded-md"
                                    >
                                      삭제
                                    </button>
                                  </div>
                                </div>
                                <div className="flex w-1/6 h-140px border-gray-1 border-1px items-center justify-items-center rounded-lg text-gray-2">
                                  <span className="w-full cursor-move text-xl font-normal text-center">☰</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.push({ title: '', artist: '', open: true })}
                    className="w-full h-48px text-pmd border-gray-1 border-1px text-system-black rounded-xl"
                  >
                    곡 추가하기
                  </button>
                </DragDropContext>
              )}
            </FieldArray>
            <CustomLongTextInput label="공연을 설명해주세요" name="content" type="text" placeholder="공연 소개, 팀 소개 등을 입력해주세요" />
            <NextButton isValid={formikProps.isValid} currentIndex={currentIndex} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step2;
