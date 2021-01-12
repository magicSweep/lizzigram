import React, { useEffect } from "react";
import TagsCheckbox, { ITagsCheckboxDataProps } from "./TagsCheckbox";
import { useForm } from "react-hook-form";
import { tagsData, state as initTagsState, defaultTagsIds } from "./__mock";

const tagsRules = {
  validate: (tags: { [name: string]: boolean }) => {
    //console.log("tags required", tags);

    let isTap = false;

    if (!tags) isTap = false;

    for (let i in tags) {
      if (tags[i] === true) {
        isTap = true;
        break;
      }
    }

    return isTap || "Добавьте хотя бы один тэг.";
  },
};

export default {
  component: TagsCheckbox,
  title: "FormElements/TagsCheckbox",
  decorators: [
    (story: any) => (
      <div style={{ width: "500px", margin: "auto", paddingTop: "20px" }}>
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    errors,
  } = useForm({
    defaultValues: {
      tags: initTagsState,
    },
  });

  useEffect(() => {
    register({ name: "tags", type: "custom" }, tagsRules);
  }, [register]);

  // tagsState = { tag_id: boolean } - in input checkbox we use name={tag._id}
  const tagsState = watch("tags");

  const onCheckboxChange = (event: any) => {
    //console.log("handleDateChange", event.target);
    //const newState = { ...state, [event.target.name]: event.target.checked };
    const newState = {
      ...tagsState,
      [event.target.name]: event.target.checked,
    };
    clearErrors("tags");
    setValue("tags", newState);
    //setState(newState);
  };

  console.log("RENDER TAGS STORIES FORM");

  return (
    <form onSubmit={handleSubmit((data: any) => console.log("SUBMIT", data))}>
      <TagsCheckbox
        label={"Выберите тэги:"}
        tagsState={{
          tags: tagsData,
          error: false,
          loading: false,
        }}
        itemsState={tagsState}
        onChange={onCheckboxChange}
        error={errors.tags}
        disabled={false}
      />
      <br />
      <button type="submit">Go</button>
    </form>
  );
};

export const Default = () => {
  return <Form />;
};

const Template = (args: ITagsCheckboxDataProps) => <TagsCheckbox {...args} />;

const args = {
  label: "Choose tags:",
  tagsState: {
    tags: tagsData,
    error: false,
    loading: false,
  },
  itemsState: initTagsState,
  onChange: () => console.log("onChange"),
  error: undefined,
  disabled: false,
};

export const Tags = Template.bind({});
(Tags as any).args = {
  ...args,
};

export const ErrorTags = Template.bind({});
(ErrorTags as any).args = {
  ...args,
  error: { message: "Вы что с ума сошли?" },
};

export const DisabledTags = Template.bind({});
(DisabledTags as any).args = {
  ...args,
  disabled: true,
};

export const LoadingTags = Template.bind({});
(LoadingTags as any).args = {
  ...args,
  tagsState: {
    ...args.tagsState,
    loading: true,
  },
};
