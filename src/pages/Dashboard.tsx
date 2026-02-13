import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { CalendarDays, Receipt, PawPrint, Users, Package } from "lucide-react";
import { format } from "date-fns";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return <div className="h-24 animate-pulse rounded-xl bg-muted" />;
}

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => apiClient.getDashboard(),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-xl font-bold">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
        Failed to load dashboard: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-xl font-bold text-foreground">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Today's Appointments"
          value={data?.todays_appointments ?? 0}
          icon={CalendarDays}
          color="bg-accent text-accent-foreground"
        />
        <StatCard
          label="Total Pets"
          value={data?.total_pets ?? 0}
          icon={PawPrint}
          color="bg-accent text-accent-foreground"
        />
        <StatCard
          label="Total Owners"
          value={data?.total_owners ?? 0}
          icon={Users}
          color="bg-secondary text-secondary-foreground"
        />
        {isAdmin && (
          <StatCard
            label="Pending Invoices"
            value={data?.pending_invoices ?? 0}
            icon={Receipt}
            color="bg-secondary text-secondary-foreground"
          />
        )}
      </div>

      {/* Today's Appointments */}
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-base font-semibold text-card-foreground">
          Today's Appointments
        </h2>
        {data?.todays_appointment_list?.length ? (
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {data.todays_appointment_list.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {apt.pet?.name ?? "Pet"} — {apt.procedure_type ?? "Checkup"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {apt.start_time} – {apt.end_time}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                    apt.status === "completed"
                      ? "bg-accent text-accent-foreground"
                      : apt.status === "cancelled"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No appointments scheduled for today.</p>
        )}
      </section>

      {/* Low Stock (admin only) */}
      {isAdmin && data?.low_stock_items?.length ? (
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-card-foreground">
            <Package className="h-4 w-4 text-warning" />
            Low Stock Alerts
          </h2>
          <div className="space-y-2">
            {data.low_stock_items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 text-sm"
              >
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="text-xs font-medium text-destructive">
                  Qty: {item.quantity} (min: {item.low_stock_threshold})
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
