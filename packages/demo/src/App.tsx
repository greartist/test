// import { Button, ConfigProvider } from '@s9g/dml-react/lib/index.js';
import { Button, ConfigProvider } from '@s9g/dml-react';

function App() {
  return (
    <div className="App">
      <ConfigProvider>
        <Button type="submit" name="112" className="test1">
          <span>test</span>
        </Button>
      </ConfigProvider>
    </div>
  );
}

export default App;
