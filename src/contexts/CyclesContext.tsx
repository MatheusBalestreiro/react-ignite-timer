import { ReactNode, createContext, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { ActionTypes, addNewCycleAction, interrupeCurrentCycleAction, markCurrentCycleAsFinishiedAction } from "../reducers/cycles/actions";

interface CreateCycleData{
  task: string
  minutesAmount: number
} 



interface CyclesContextType {
  cycles: Cycle[]
  activeCycle : Cycle | undefined
  activeCycleId : string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}



export function CyclesContextProvider({ children, }: CyclesContextProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const {cycles,activeCycleId} = cyclesState

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(){
    dispatch(markCurrentCycleAsFinishiedAction())
  }

  function createNewCycle(data : CreateCycleData){
    const id = String(new Date().getTime())

    const newCycle : Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interrupeCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider value={{ cycles,activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed , setSecondsPassed, createNewCycle, interruptCurrentCycle}}>
      {children}
    </CyclesContext.Provider>
  )
}