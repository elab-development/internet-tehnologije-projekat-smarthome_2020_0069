import "./App.scss";
import Devices from "./Pages/Devices";
import Login from "./Pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Devices />
        </QueryClientProvider>
    );
}

export default App;
