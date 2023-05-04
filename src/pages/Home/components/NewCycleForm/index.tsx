import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from "react-hook-form";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 60 minutos.').max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })
  return(
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput disabled={!!activeCycle} id="task" placeholder="Dê um nome para o seu projeto" list="task-suggestions" {...register('task')} />

      <datalist id="task-suggestions">
        <option value="1"></option>  
        <option value="2"></option>  
        <option value="3"></option>  

      </datalist>     
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput disabled={!!activeCycle} step={5} min={5} max={60} type="number" id="minutesAmount" placeholder="00" {...register('minutesAmount', { valueAsNumber: true })}/>
      <span>minutos.</span>
    </FormContainer>

  )
}