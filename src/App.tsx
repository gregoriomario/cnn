import { createSignal } from "solid-js";
import { generateRandomFloat, selectRandomItem } from "./utils/random";

function App() {
    const [result, setResult] = createSignal<{
        category: string | null;
        probability: number | null;
    }>({
        category: null,
        probability: null,
    });
    const [fileInput, setFileInput] = createSignal<HTMLInputElement | null>(
        null
    );
    const [selectedImage, setSelectedImage] = createSignal<string | null>(null);

    function handleUpload() {
        if (!fileInput) return;
        fileInput()?.click();
    }

    function processImage(input: File) {
        input.name;
        const selection = ["matang", "setengah matang", "tidak matang"];

        setResult({
            category: selectRandomItem(selection) as string,
            probability: generateRandomFloat(),
        });
    }

    function handleFileChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.files && inputElement.files.length > 0) {
            const file = inputElement.files[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setSelectedImage(e.target?.result as string);
                };
                reader.readAsDataURL(file);
                processImage(file);
            } else {
                console.log("Please select an image file.");
            }
        }
    }

    return (
        <div class="bg-white">
            <section class="w-full min-h-screen h-full flex flex-col justify-center items-center">
                <h1 class="text-2xl mb-3 font-medium">CNN Classification</h1>
                <div class="mb-6">
                    <button
                        onClick={handleUpload}
                        class="aspect-square w-56 max-h-56 overflow-hidden  border-2 border-dashed rounded-lg  text-slate-400"
                    >
                        {selectedImage() ? (
                            <img
                                src={selectedImage() as string}
                                alt="Selected Image"
                            />
                        ) : (
                            "Upload File Here"
                        )}
                    </button>
                    <input
                        accept="image/jpeg, image/png, image/gif"
                        ref={setFileInput}
                        type="file"
                        class="hidden object-center object-cover"
                        onChange={handleFileChange}
                    ></input>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <p>
                        Result: <strong>{result().category}</strong>
                    </p>
                    <p>
                        Probability: <strong>{result().probability}</strong>
                    </p>
                </div>
            </section>
        </div>
    );
}

export default App;
