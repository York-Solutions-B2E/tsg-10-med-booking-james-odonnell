import {createContext, useContext, useState, useEffect} from 'react';

const PatientContext = createContext();
export const usePatientContext = () => {
	return useContext(PatientContext);
}

const PatientProvider = ({children}) => {

	const [patientInfo, setPatientInfo] = useState(false);

	return (
		<PatientContext.Provider value={{patientInfo, setPatientInfo}}>
			{children}
		</PatientContext.Provider>
	);

}

export default PatientProvider;