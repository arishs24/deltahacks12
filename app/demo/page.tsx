import { Chat } from "../../components/chat/Chat";
import { CustomizationDemo } from "../../components/chat/CustomizationDemo";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
          <div className="text-center space-y-2 px-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-foreground">
              Chat Demo
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Test your chat application and see how themes and fonts look in action.
            </p>
          </div>
          
          <div className="w-full max-w-4xl space-y-8 sm:space-y-12">
            {/* Chat Demo */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-lg">
                <Chat />
              </div>
            </div>
            
            {/* Customization Demo */}
            <div className="w-full">
              <CustomizationDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 