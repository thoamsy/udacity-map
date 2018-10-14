# Map

Udacity 前端进阶的项目。在开发的时候，`Suspense` 这个特性还没有正式开放，故使用的不是正式版 React。对应的 React Version：_16.5.2_

在该 React 版本中，有很多有意思的新特性

1. React Suspense
2. React Cache
3. React.lazy
4. React.pure
5. React.unstable_ConcurrentMode

其中除了第 5 个，本项目都使用了。前两个用来替代传统的 didComponent 来发送 ajax 的方式，并自带缓存功能。
第 3 个做到了原生支持 _Code-Splitting_, 可以替代 react-loadable
第 4 项类似于 `React.PureComponent`, 只不过它是作用于 Functional Component

因为项目本身不是很复杂，没用状态管理库

除此之外，赶上 Babel 7 的发布，为了使用一些很酷的新语法，将 create-react-app 的配置的 eject 了，使用自己调整过的 Babel 配置来开发。

支持的新语法有：

1. `<></>` 而不是 `<Fragment></Fragement>`
2. 支持 `a?.b.c`
3. 支持 `1 |> (x => x + 1)`
4. 支持 `undefined ?? 1`

## 第三方 API

1. Google
2. Dark Sky 用于获取天气

# TODO

- [ ]: 更新到 create-react-2
