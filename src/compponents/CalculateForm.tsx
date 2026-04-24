import { useState } from "react";

const CalculateForm = () => {

    const [currentValue, setCurrentValue] = useState("0");
    const [previousValue, setPreviousValue] = useState<string | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [memoryValue, setMemoryValue] = useState(0);
    const [decimalPrecision, setDecimalPrecision] = useState(2);

    const handleNumber = (num: string) => {
        setCurrentValue((prev) => (prev === "0" ? num : prev + num));
    };

    const handleOperator = (op: string) => {
        if(currentValue === "0") 
            return;
        setPreviousValue(currentValue);
        setOperator(op);
        setCurrentValue("0");
    };

    const handleEquals = () => {
        if(previousValue === null || operator === null) return;

        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);

            let result = 0;

            switch (operator) {
                case "+":
                    result = prev + current;
                    break;

                case "-":
                    result = prev - current;
                    break;  
                case "*":
                    result = prev * current;
                    break;
                case "/":
                    if (current === 0) {
                        setCurrentValue("Error");
                        return;
        }
        result = prev / current;
        break;  
            default:
                return;
            }
            const formatted = result.toFixed(decimalPrecision);
            setCurrentValue(formatted);
            setPreviousValue(null);
            setOperator(null);
    };  

    const handleClear = () => {
        setCurrentValue("0");
        setPreviousValue(null);
        setOperator(null);
    };

    const handleDecimal = () => {
        setCurrentValue((prev) => (prev.includes(".") ? prev : prev + "."));
    };
        return (
            <div className="flex items-center justify-center min-h-screen bg-emerald-100">

                {/* Card */}
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">

                    {/* Title */}
                    <h1 className="text-lg font-bold text-emerald-700 mb-4 text-center">
                        Calculator
                    </h1>

                    {/* Display */}
                    <div className="bg-gray-100 text-right text-2xl font-semibold p-4 rounded-lg mb-4 overflow-hidden truncate">
                        {currentValue}  
                    </div>

                    {/* Decimal Range */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                            Decimal Places
                        </label>

                        <input
                            type="range"
                            min="0"
                            max="8"
                            defaultValue="2"
                            className="w-full"
                        />

                        <div className="text-sm text-gray-500 mt-1 text-center">
                            2 digits
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-4 gap-3">

                        {/* Numbers */}
                        {["7", "8", "9", "/",
                            "4", "5", "6", "*",
                            "1", "2", "3", "-",
                            "0", ".", "=", "+"].map((btn) => (
                                <div
                                    key={btn}
                                    className="bg-emerald-100 text-emerald-700 hover:bg-emerald-500 hover:text-white transition-colors p-4 rounded-lg text-center cursor-pointer"
                                >
                                    {btn}
                                </div>
                            ))}

                    </div>

                </div>
            </div>
        );
    };

    export default CalculateForm;