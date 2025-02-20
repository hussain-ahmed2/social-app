import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(initialValue);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		try {
			const storedValue = localStorage.getItem(key);
			if (storedValue !== null) {
				setValue(JSON.parse(storedValue));
			}
		} catch (error) {
			console.error("Error reading localStorage key:", key, error);
		}
	}, [key]);

	useEffect(() => {
		if (isClient) {
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.error("Error setting localStorage key:", key, error);
			}
		}
	}, [isClient, key, value]);

	return [value, setValue] as const;
}

export default useLocalStorage;
