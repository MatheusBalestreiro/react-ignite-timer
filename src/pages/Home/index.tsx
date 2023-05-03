import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  MinutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 60 minutos.').max(60)
})

export function Home() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })

  function handleCreateNewCycle(data : any){

    
  }

  const task = watch('task')
  const isSubmitDisabled = !task;


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" placeholder="Dê um nome para o seu projeto" list="task-suggestions" {...register('task')} />

          <datalist id="task-suggestions">
            <option value="1"></option>  
            <option value="2"></option>  
            <option value="3"></option>  

          </datalist>     
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput step={5} min={5} max={60} type="number" id="minutesAmount" placeholder="00" {...register('minutesAmount', { valueAsNumber: true })}/>
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
