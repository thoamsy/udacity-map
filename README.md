# Map

Udacity 前端进阶的项目。在开发的时候，还不支持 `Suspense` 这个特性，故使用的不是正式版 React。

除此之外，赶上 Babel 7 的发布，为了使用一些很酷的新语法，将 create-react-app 的配置的 eject 了，使用自己调整过的 Babel 配置来开发。

支持的新语法有：

1. `<></>` 而不是 `<Fragment></Fragement>`
2. 支持 `a?.b.c`
3. 支持 `1 |> (x => x + 1)`
4. 支持 `undefined ?? 1`
