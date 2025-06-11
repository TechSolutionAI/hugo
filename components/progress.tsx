interface ProgressProps {
    current: number;
    total: number;
}

export default function Progress({ current, total }: ProgressProps) {
    const percentage = Math.round((current / total) * 100);
    return (
        <div>
            <p className="text-end">{percentage}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                    ></div>
            </div>
        </div>
    );
}