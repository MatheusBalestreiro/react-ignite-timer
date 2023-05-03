import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'
import { useState } from "react";



export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data){

    
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
