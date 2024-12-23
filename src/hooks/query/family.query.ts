import { r } from "@/config/request";
import { useSession } from "@/providers/SessionProvider";
import { useQuery } from "@tanstack/react-query";

// Gets a loggedin user's tree
export const useGetFamilyTree = () => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["family"],
    queryFn: async () => {
      return await r
        .get({ endpoint: "/family", token })
        .then((data) => ({ ...data, top: true }));
    },
    // refetchInterval: 5000,
    staleTime: 0,
    retry: 1,
  });
};

// search tree on phone
export const useGetFullTree = () => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["family", "fulltree"],
    staleTime: 0,
    queryFn: async () => {
      return await r.get({ endpoint: "/family/fulltree", token });
    },
    retry: 1,
    // refetchInterval: 10000,
  });
};

// search tree on phone
export const useGetTreeByPhone = (phone: string) => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["family", phone],
    staleTime: 0,
    queryFn: async () => {
      return await r.get({ endpoint: `/family/findtree/${phone}`, token });
    },
    retry: 1,
    // refetchInterval: 5000,
  });
};

// search tree on phone
export const useGetTreeById = (id: string) => {
  const {
    session: { accessToken: token },
  } = useSession();

  return useQuery({
    queryKey: ["family", id],
    staleTime: 0,
    queryFn: async () => {
      return await r.get({ endpoint: `/family/treebyuserid/${id}`, token });
    },
    retry: 1,
    // refetchInterval: 5000,
  });
};

export const useGetSearchResult = (query: any) => {
  const {
    session: { accessToken: token },
  } = useSession();
  const queryString = new URLSearchParams(query).toString();
  return useQuery({
    queryKey: ["family", query],
    queryFn: async () =>
      await r.get({
        endpoint: `/family/people?${queryString}`,
        token,
      }),
  });
};

export const useGetMergeTree = (route: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["merge", route],
    queryFn: async () =>
      await r.get({
        endpoint: route,
        token,
      }),
  });
};

export const useGetClaimedDemo = (id: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["merge", id],
    queryFn: async () =>
      await r.get({
        endpoint: `/merge/claimdemo?claimthis=${id}`,
        token,
      }),
  });
};

export const useViewDemoTreeForProfile = (route: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["merge", route],
    queryFn: async () =>
      await r.get({
        endpoint: route,
        token,
      }),
  });
};

// EDIT FORM QUERIES
export const useGetPersonData = (id: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["family", "person", id],
    queryFn: async () =>
      await r.get({
        endpoint: `/family/persondata/${id}`,
        token,
      }),
  });
};

export const useGetPersonWives = (id: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["family", "person", "wives", id],
    queryFn: async () =>
      await r.get({
        endpoint: `/family/wives/${id}`,
        token,
      }),
  });
};

export const useGetSpouseData = (id: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["family", "spouse", id],
    queryFn: async () =>
      await r.get({
        endpoint: `/family/wifedata/${id}`,
        token,
      }),
  });
};

export const useGetDaughterData = (id: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["family", "spouse", id],
    queryFn: async () =>
      await r.get({
        endpoint: `/family/daughterdata/${id}`,
        token,
      }),
  });
};

export const useGetInlawData = (id: string) => {
  const {
    session: { accessToken: token },
  } = useSession();
  return useQuery({
    queryKey: ["family", "husband", id],
    queryFn: async () =>
      await r.get({
        endpoint: `/family/husbanddata/${id}`,
        token,
      }),
  });
};
