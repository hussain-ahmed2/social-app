import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
	const storedValue = localStorage.getItem(key);
	const [data, setData] = useState<T>(
		storedValue ? JSON.parse(storedValue) : initialValue
	);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(data));
	}, [key, data]);

	return [data, setData] as const;
}
