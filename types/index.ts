import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface UserData {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  roles: Array<{ id: number; name: string; description: string }>;
  permissions: string[];
  stats: {
    totalSales: number;
    totalRevenue: number;
    activeProducts: number;
    totalCustomers: number;
  };
}

export interface TabItem { 
  value: string;
  label: string;
  icon: ReactNode;
}