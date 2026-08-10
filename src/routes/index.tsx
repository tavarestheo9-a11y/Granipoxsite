import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

/**
 * A rota "/" apenas encaminha para o site estático em /site/index.html
 * (HTML5 + CSS3 + JavaScript puro, sem framework).
 */
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Granipox Construção Civil | Granitos, Mármores e Bancadas Sob Medida" },
      {
        name: "description",
        content:
          "Granipox Construção Civil: granitos, mármores, quartzo, bancadas e revestimentos sob medida. Solicite seu orçamento pelo WhatsApp.",
      },
      { property: "og:title", content: "Granipox Construção Civil | Granitos, Mármores e Bancadas Sob Medida" },
      {
        property: "og:description",
        content: "Granipox Construção Civil: granitos, mármores, quartzo, bancadas e revestimentos sob medida. Solicite seu orçamento pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  useEffect(() => {
    window.location.replace("/site/index.html");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">
        Abrindo o site da Granipox…{" "}
        <a className="underline" href="/site/index.html">
          clique aqui
        </a>
      </p>
    </div>
  );
}
