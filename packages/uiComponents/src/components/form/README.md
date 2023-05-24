# 使用说明

### 1. 导入 useForm

```

import { useForm } from '@quark-base-plugin/core/src/components/form';

```

### 2. 在组件中使用

```

const {
  Form,
  FormItem,
  formRef: { control, setValue, getValues, trigger, clearErrors },
} = useForm<any>({
  onFinish,
  mode: 'onChange',
  renderComponent: DefaultFormItemWrapper,

  // defaultValues: async () => {
  //   await new Promise<void>((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 5000);
  //   });
  //   return { loanAmount: 4444 };
  // },
});


...

<!-- 注意，Form 下可以自由组合组件，FormItem 下只能包含一个受控组件 -->
<Form>
  <div />

  // ....

  <FormItem>
  <input>
  </FormItem>

  <FormItem>
  <select>
  </FormItem>

<!-- button type 为submit时点击验证时 onFinish 或 onFinishFailed 会触发，如想要自定义提交逻辑，使用 formRef.trigger验证 ，formRef.getValues() 获取值 -->
  <button type="submit">submit</button>

</Form>


```

### 3 定制 form item 样式

1. 向 useForm 参数传递 renderComponent 统一组件样式（根据 FormItemWrapperProps 属性来定制样式）

2. 单独定制 form item, 传递 renderComponent
