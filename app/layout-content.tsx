// "use client";

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/ui/App-sidebar";
// import { useFilterContext } from "@/lib/context/filter-context";

// export function LayoutContent({ children }: { children: React.ReactNode }) {
//   const { showMap } = useFilterContext();

//   if (!showMap) {
//     // Landing page - no sidebar
//     return (
//       <main className="min-h-screen flex items-center justify-center">
//         {children}
//       </main>
//     );
//   }

//   // Map view - with sidebar
//   return (
//     <SidebarProvider defaultOpen={true}>
//       <div className="flex min-h-screen">
//         <AppSidebar />
//         <main className="flex-1 flex flex-col overflow-x-hidden">
//           <div className="p-2">
//             <SidebarTrigger />
//           </div>
//           <div className="flex-1 p-6 max-w-full">
//             {children}
//           </div>
//         </main>
//       </div>
//     </SidebarProvider>
//   );
// }
