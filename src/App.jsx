import { useRef, useCallback, useEffect, useState } from "react";
import SlideInNotifications from "./Notification.jsx";

function App() {
    const [notification, setNotification] = useState(false);
    const [length, setLength] = useState(6);
    const [password, setPassword] = useState("");

    const [notifications, setNotifications] = useState([]);
    const addNotification = () => {
        setNotifications((prev) => {
            // Remove the oldest notification if the max limit (5) is reached
            if (prev.length >= 5) {
                return [...prev.slice(1), { id: Math.random(), text: "Password Copied successfully!" }];
            }
            return [...prev, { id: Math.random(), text: "Password Copied successfully!" }];
        });
    };
    const removeNotif = (id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    };

    const [options, setOptions] = useState({
        allowNum: false,
        allowChar: false,
    });

    const inputRef = useRef(null);

    function handleOption(option) {
        setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
        setNotification(true);
    }
    function handleCopy() {
        window.navigator.clipboard.writeText(password);
        addNotification();
    }

    const generatePass = useCallback(() => {
        let str = "ABCDEFGHIJKLMNOPQRSTUVYXYZabcdefghijklmnopqrstuvwxyz";
        let chars = ".,#$*@!";
        let nums = "123456789";
        let newPass = "";

        if (options.allowNum) str += nums;
        if (options.allowChar) str += chars;

        for (let index = 1; index <= length; index++) {
            let charIdx = Math.floor(Math.random() * str.length);
            newPass += str.charAt(charIdx);
        }
        setPassword(newPass);
    }, [length, options, setPassword]);

    useEffect(() => {
        generatePass();
    }, [length, options, setPassword]);

    return (
        <>
            <main className="container bg-slate-900 text-slate-100 min-h-screen">
                <section className="flex flex-col gap-8 max-sm:gap-20 py-16 ">
                    <h2 className="text-4xl sm:text-5xl uppercase font-bold text-center tracking-widest">
                        random password generator
                    </h2>
                    <div className="w-full sm:w-96 mx-auto flex flex-col gap-4 max-sm:gap-12">
                        <div className="flex border border-spacing-2 border-slate-100 rounded-lg overflow-hidden">
                            <input
                                ref={inputRef}
                                className="flex-1 text-slate-900 p-4 py-2 focus:ring-0 focus:border-0 focus:outline-none"
                                type="text"
                                readOnly
                                value={password}
                                placeholder="Start typing..."
                            />
                            <button
                                className="w-max p-4 py-2 uppercase font-bold tracking-wide active:scale-75"
                                onClick={handleCopy}
                            >
                                copy
                            </button>
                        </div>
                        <SlideInNotifications notifications={notifications} removeNotif={removeNotif} />

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <label htmlFor="range">Range</label>
                                <input
                                    type="range"
                                    id="range"
                                    min={1}
                                    max={20}
                                    value={length}
                                    onChange={(e) => setLength(Number(e.target.value))}
                                />
                                <label
                                    htmlFor="range "
                                    className="bg-slate-100 text-slate-900 grid place-items-center w-8 h-8 py-0 font-semibold uppercase text-lg"
                                >
                                    {length}
                                </label>
                            </div>

                            <div className="flex gap-4">
                                <label htmlFor="charsip">Include Special Characters: </label>
                                <input
                                    type="checkbox"
                                    name="valChar"
                                    id="charsip"
                                    value={options.allowChar}
                                    onChange={() => handleOption("allowChar")}
                                />
                            </div>
                            <div className="flex gap-4">
                                <label htmlFor="numsip">Include Numbers: </label>
                                <input
                                    type="checkbox"
                                    name="valNum"
                                    id="numsip"
                                    value={options.allowNum}
                                    onChange={() => handleOption("allowNum")}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default App;
