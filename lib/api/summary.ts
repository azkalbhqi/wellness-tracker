
export interface HistoryData {
    id: string;
    createdAt: string;
    duration: number;
    counselor_name: string;
  }
  
 
  export async function fetchHistoryData(): Promise<HistoryData[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    if (!baseUrl) {
      console.error("error");
      return [];
    }
  
    try {
      const res = await fetch(`${baseUrl}/api/history`, {
        cache: "no-store", //no caching
      });
  
      if (!res.ok) throw new Error("Failed to fetch history data");
  
      const data: HistoryData[] = await res.json();
  
      // Sort tanggal
      return data.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } catch (error) {
      console.error("Error fetching History data:", error);
      return [];
    }
  }
  