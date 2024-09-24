import { useContext } from 'react'
import MainContext from '@/context/MainContext';

const useMainContext = () => useContext(MainContext)

export default useMainContext