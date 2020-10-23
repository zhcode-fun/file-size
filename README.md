# file-size

A simple extension.Show current text file size in the statusbar.
The status will update when the file is saved or change active tab.

# Usage

![Usage](https://upload-images.jianshu.io/upload_images/4263081-35dc70d0ae1e8075.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# Configurations

1. File > Preferences > User Setting (or Workspace Setting)
1. 文件 > 首选项 > 设置
2. Add/Modify the these key-value.
2. 搜索拖入用户设置中覆盖即可
3. Save.(Will change immediately)
3. 保存后会立刻产生变化

| key                | value      |default|
| ------------------ |:----------:| -----:|
| file-size.position | right/left | right |
| file-size.priority | integer    |   0   |

> The priority of display in the status bar. Higher value means shown the left.
> `file-size.priority`的值越大，位置就越向左，api上是这么说的，不过我也没太摸清规律，不起作用就往大了设，我设了100才能在右端最左边显示


![Setting.json](https://upload-images.jianshu.io/upload_images/4263081-46fcab9851881710.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
