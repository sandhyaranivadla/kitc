import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Section } from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

type LeadTable = "applications" | "donations" | "employer_requests" | "contact_messages";

const STATUSES = ["new", "contacted", "in_progress", "closed"] as const;

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — KITC" },
      { name: "description", content: "Manage KITC applications, donations, employer requests and messages." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Console — KITC" },
      { property: "og:description", content: "KITC staff lead management console." },
    ],
  }),
  component: AdminPage,
});

function useLeads(table: LeadTable, enabled: boolean) {
  return useQuery({
    queryKey: ["leads", table],
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as Record<string, unknown>[];
    },
  });
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<LeadTable>("applications");

  const isAdmin = useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return false;
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "admin",
      });
      if (error) throw error;
      return Boolean(data);
    },
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isAdmin.isLoading) {
    return (
      <Section>
        <p className="text-muted-foreground">Checking your access…</p>
      </Section>
    );
  }

  if (!isAdmin.data) {
    return (
      <Section title="Admin access required">
        <p className="max-w-lg text-muted-foreground">
          Your account is signed in but does not have the admin role yet. Ask an existing administrator to grant you
          access, then reload this page.
        </p>
        <Button className="mt-6" variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </Section>
    );
  }

  return (
    <Section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Admin console</h1>
          <p className="mt-2 text-muted-foreground">All enquiries submitted through the website.</p>
        </div>
        <Button variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as LeadTable)} className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="employer_requests">Employers</TabsTrigger>
          <TabsTrigger value="contact_messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="applications">
          <LeadTableView
            table="applications"
            active={tab === "applications"}
            columns={["reference_no", "full_name", "phone", "program_track", "center", "created_at"]}
          />
        </TabsContent>
        <TabsContent value="donations">
          <LeadTableView
            table="donations"
            active={tab === "donations"}
            columns={["donor_name", "organisation", "phone", "amount", "purpose", "created_at"]}
          />
        </TabsContent>
        <TabsContent value="employer_requests">
          <LeadTableView
            table="employer_requests"
            active={tab === "employer_requests"}
            columns={["company_name", "contact_person", "phone", "roles_needed", "openings", "created_at"]}
          />
        </TabsContent>
        <TabsContent value="contact_messages">
          <LeadTableView
            table="contact_messages"
            active={tab === "contact_messages"}
            columns={["full_name", "phone", "center", "message", "created_at"]}
          />
        </TabsContent>
      </Tabs>
    </Section>
  );
}

function LeadTableView({
  table,
  columns,
  active,
}: {
  table: LeadTable;
  columns: string[];
  active: boolean;
}) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useLeads(table, active);

  async function updateStatus(id: string, status: string) {
    const { error: updateError } = await supabase
      .from(table)
      .update({ status } as never)
      .eq("id", id);
    if (updateError) {
      toast.error("Couldn't update status");
      return;
    }
    toast.success("Status updated");
    queryClient.invalidateQueries({ queryKey: ["leads", table] });
  }

  if (isLoading) return <p className="mt-6 text-muted-foreground">Loading…</p>;
  if (error) return <p className="mt-6 text-destructive">Couldn't load records.</p>;
  if (!data?.length) return <p className="mt-6 text-muted-foreground">No records yet.</p>;

  return (
    <Card className="mt-6 shadow-card">
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c} className="whitespace-nowrap capitalize">
                  {c.replace(/_/g, " ")}
                </TableHead>
              ))}
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={String(row["id"])}>
                {columns.map((c) => (
                  <TableCell key={c} className="max-w-[240px] align-top text-sm">
                    {formatCell(c, row[c])}
                  </TableCell>
                ))}
                <TableCell className="align-top">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{String(row["status"] ?? "new")}</Badge>
                    <Select
                      value={String(row["status"] ?? "new")}
                      onValueChange={(value) => updateStatus(String(row["id"]), value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function formatCell(column: string, value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  if (column === "created_at") return new Date(String(value)).toLocaleString("en-IN");
  return String(value);
}
