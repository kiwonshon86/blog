"use client";

import Giscus from "@giscus/react";
import type { GiscusConfig } from "@/lib/giscus";

type GiscusCommentsProps = {
  config: GiscusConfig;
  slug: string;
};

export default function GiscusComments({ config, slug }: GiscusCommentsProps) {
  return (
    <div className="mt-10">
      <Giscus
        key={slug}
        id="giscus-comments"
        repo={config.repo}
        repoId={config.repoId}
        category={config.category}
        categoryId={config.categoryId}
        mapping={config.mapping}
        strict={config.strict}
        reactionsEnabled={config.reactionsEnabled}
        emitMetadata={config.emitMetadata}
        inputPosition={config.inputPosition}
        theme={config.theme}
        lang={config.lang}
        loading={config.loading}
      />
    </div>
  );
}
