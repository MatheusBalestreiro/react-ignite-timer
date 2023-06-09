import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { useContext } from 'react';
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function NewCycleForm() {
  const { activeCycle,  } = useContext(CyclesContext)
  const { register } = useFormContext()
  
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