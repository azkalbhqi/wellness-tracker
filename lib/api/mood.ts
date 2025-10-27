
export interface MoodData {
    id: string;
    createdAt: string;
    mood: number;
  }
  
  export async function addMoodData(mood: number): Promise<MoodData | null> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    if (!baseUrl) {
      console.error("error");
      return null;
    }
  
    try {
      const res = await fetch(`${baseUrl}/api/mood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood,
          createdAt: new Date().toISOString(),
        }),
      });
  
      if (!res.ok) throw new Error("Failed to add mood data");
  
      const data: MoodData = await res.json();
      return data;
    } catch (error) {
      console.error("Error adding mood data:", error);
      return null;
    }
  }
 
  export async function fetchMoodData(): Promise<MoodData[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    if (!baseUrl) {
      console.error("error");
      return [];
    }
  
    try {
      const res = await fetch(`${baseUrl}/api/mood`, {
        cache: "no-store", //no caching
      });
  
      if (!res.ok) throw new Error("Failed to fetch mood data");
  
      const data: MoodData[] = await res.json();
  
      // Sort tanggal
      return data.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } catch (error) {
      console.error("Error fetching mood data:", error);
      return [];
    }
  }
  