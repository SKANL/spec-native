import electronLogo from './assets/electron.svg'
import Versions from './components/Versions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <main className="w-full max-w-lg px-4">
      <Card className="backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mb-2 flex justify-center">
            <img alt="Template logo" className="h-16 w-16" src={electronLogo} />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">Electron Template</Badge>
            <Badge variant="outline">shadcn/ui</Badge>
          </div>
          <CardTitle className="text-xl">Welcome to your starter app</CardTitle>
          <CardDescription>
            A minimal desktop template powered by Electron, React, Vite and Tailwind.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-center text-sm text-muted-foreground">
          <p>Use this as a base for future projects and iterate component by component.</p>
          <Separator />
          <p>
            Tip: press <code>F12</code> to open DevTools.
          </p>
        </CardContent>
        <CardFooter className="justify-center gap-2">
          <Button asChild variant="secondary">
            <a href="https://electron-vite.org/" rel="noreferrer" target="_blank">
              Docs
            </a>
          </Button>
          <Button onClick={ipcHandle}>Test IPC</Button>
        </CardFooter>
      </Card>
      <Versions />
    </main>
  )
}

export default App
